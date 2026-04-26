import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const servicesDir = path.join(root, 'docs/services')
const imagesDir = path.join(root, 'docs/public/images/services')
const outputFile = path.join(root, 'docs/.vitepress/theme/data/services.json')

const ignoredServiceFiles = new Set([
  'all.md',
  'introduction.md',
  'overview.md',
])

const imageExtensions = new Set(['.svg', '.png', '.webp', '.jpg', '.jpeg'])
const iconSuffixes = ['-logo', '_logo', 'logo']

function parseFrontmatter(markdown, file) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!match) {
    throw new Error(`${file} is missing frontmatter`)
  }

  const frontmatter = {}
  const lines = match[1].split(/\r?\n/)

  for (const line of lines) {
    const valueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)

    if (!valueMatch) {
      continue
    }

    const [, key, rawValue] = valueMatch
    frontmatter[key] = parseScalar(rawValue)
  }

  return frontmatter
}

function parseScalar(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  if (trimmed === 'true') {
    return true
  }

  if (trimmed === 'false') {
    return false
  }

  return trimmed
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function parseServiceCategories(allServicesMarkdown) {
  const categories = new Map()
  let currentCategory = ''

  for (const line of allServicesMarkdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/)

    if (heading) {
      currentCategory = heading[1].trim()
      continue
    }

    const serviceLink = line.match(/^- \[[^\]]+\]\(\/services\/([^)]+)\)/)

    if (serviceLink && currentCategory) {
      categories.set(serviceLink[1], currentCategory)
    }
  }

  return categories
}

function buildImageIndex(files) {
  return files
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .map((file) => {
      const extension = path.extname(file)
      const basename = path.basename(file, extension)

      return {
        file,
        basename,
        normalizedBasename: normalize(basename),
      }
    })
}

function resolveIcon(slug, title, imageIndex) {
  const candidates = [
    ...iconSuffixes.map((suffix) => `${slug}${suffix}`),
    slug,
    `${title}-logo`,
    title,
  ].map(normalize)

  for (const candidate of candidates) {
    const match = imageIndex.find((image) => image.normalizedBasename === candidate)

    if (match) {
      return `/docs/images/services/${match.file}`
    }
  }

  const fuzzy = imageIndex.find((image) => {
    const normalizedSlug = normalize(slug)

    return (
      image.normalizedBasename.startsWith(`${normalizedSlug}logo`) ||
      image.normalizedBasename.startsWith(normalizedSlug)
    )
  })

  if (fuzzy) {
    return `/docs/images/services/${fuzzy.file}`
  }

  return ''
}

function extractMarkdownIcon(markdown) {
  const imageMatch =
    markdown.match(/<ZoomableImage[^>]+src=["']([^"']+)["']/) ||
    markdown.match(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/)

  if (!imageMatch) {
    return ''
  }

  const src = imageMatch[1]

  if (src.startsWith('/docs/images/services/')) {
    return src
  }

  if (src.startsWith('/images/services/')) {
    return `/docs${src}`
  }

  return ''
}

function isDisabledService(frontmatter, markdown) {
  if (frontmatter.disabled === true) {
    return true
  }

  return /SERVICE (HIDDEN|NOT AVAILABLE|REMOVED FROM COOLIFY|TEMPORARILY DISABLED)/i.test(markdown)
}

async function generateServices() {
  const [serviceFiles, imageFiles, allServicesMarkdown] = await Promise.all([
    readdir(servicesDir),
    existsSync(imagesDir) ? readdir(imagesDir) : [],
    readFile(path.join(servicesDir, 'all.md'), 'utf8'),
  ])

  const categories = parseServiceCategories(allServicesMarkdown)
  const imageIndex = buildImageIndex(imageFiles)
  const services = []

  for (const file of serviceFiles.sort()) {
    if (!file.endsWith('.md') || ignoredServiceFiles.has(file)) {
      continue
    }

    const slug = file.replace(/\.md$/, '')
    const markdown = await readFile(path.join(servicesDir, file), 'utf8')
    const frontmatter = parseFrontmatter(markdown, file)
    const title = frontmatter.title || slug
    const description = frontmatter.description || ''
    const category = frontmatter.category || categories.get(slug) || 'Uncategorized'
    const icon = frontmatter.icon || resolveIcon(slug, title, imageIndex) || extractMarkdownIcon(markdown)
    const disabled = isDisabledService(frontmatter, markdown)

    services.push({
      name: title,
      slug,
      icon,
      description,
      category,
      ...(disabled ? { disabled } : {}),
    })
  }

  services.sort((a, b) => a.name.localeCompare(b.name, 'en'))

  await mkdir(path.dirname(outputFile), { recursive: true })
  await writeFile(outputFile, `${JSON.stringify(services, null, 2)}\n`)
  console.log(`Generated ${path.relative(root, outputFile)} with ${services.length} services.`)
}

generateServices().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
