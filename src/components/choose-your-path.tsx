import Link from 'fumadocs-core/link';
import { ArrowRight, ArrowsRight, Check, Checklist2, Cloud, Server, Warning22 } from 'reicon-react';

const comparisonRows = [
  {
    area: 'Coolify instance',
    selfHosted: 'You install, update, backup, monitor, and restore the Coolify instance.',
    cloud: 'Coolify team runs, updates, backup, monitors, and restores the Coolify instance.',
  },
  {
    area: 'Your servers',
    selfHosted: 'You provide the servers and secure the operating system, SSH access, firewall, and network.',
    cloud: 'You still provide the servers and secure the operating system, SSH access, firewall, and network.',
  },
  {
    area: 'Your workloads',
    selfHosted: 'Your apps, databases, volumes, secrets, and runtime security remain your responsibility.',
    cloud: 'Your apps, databases, volumes, secrets, and runtime security remain your responsibility.',
  },
  {
    area: 'Coolify updates',
    selfHosted: 'You decide when to update Coolify and how to handle maintenance windows.',
    cloud: 'Coolify team applies control-plane updates for you.',
  },
  {
    area: 'Cost model',
    selfHosted: 'No Coolify license fee. You pay for your own infrastructure and operations time.',
    cloud: 'Paid managed service for the Coolify instance. You still pay for your own servers.',
  },
  {
    area: 'Feature set',
    selfHosted: 'All Coolify features.',
    cloud: 'Same as Self hosted. No Cloud-only feature paywall.',
  },
];

const paths = [
  {
    title: 'Self-hosted Coolify',
    href: '/start-with-self-hosted',
    icon: Server,
    cta: 'discord',
    bestWhen: 'Choose this if control, auditability, and self-managed operations matter more than the fastest setup.',
    bullets: ['You manage installation and upgrades', 'You own instance backup and restore planning', 'You control maintenance and operational standards', 'Keep all platform data under your control', 'No recurring platform subscription costs'],
  },
  {
    title: 'Coolify Cloud',
    href: '/start-with-cloud',
    icon: Cloud,
    cta: 'cloud',
    bestWhen: 'Choose this if you want the quickest route to production and less control-plane maintenance.',
    bullets: ['Coolify team manages the control plane', 'Coolify team handles platform updates', 'You still keep ownership of your servers and workloads', 'Built-in high availability for the control plane', 'No platform maintenance required'],
  },
];

export function ChooseYourPath() {
  return (
    <div data-choose-path className="not-prose my-8 space-y-7">
      <style>
        {`
          [data-choose-path] .path-card {
            background-clip: padding-box;
          }

          [data-choose-path] .path-card:hover {
            border-color: transparent;
            background:
              linear-gradient(rgb(10 10 10 / 0.94), rgb(10 10 10 / 0.94)) padding-box,
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.08),
              0 0 0 1px rgb(139 115 255 / 0.14),
              0 12px 28px rgb(94 62 216 / 0.26),
              0 2px 14px rgb(255 255 255 / 0.04);
          }

          html:not(.dark) [data-choose-path] .path-card:hover {
            background:
              linear-gradient(rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.96)) padding-box,
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.75),
              0 0 0 1px rgb(139 115 255 / 0.14),
              0 12px 28px rgb(94 62 216 / 0.18),
              0 2px 10px rgb(0 0 0 / 0.06);
          }

          [data-choose-path] .path-card-discord:hover {
            background:
              linear-gradient(rgb(10 10 10 / 0.94), rgb(10 10 10 / 0.94)) padding-box,
              linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.08),
              0 0 0 1px rgb(88 101 242 / 0.14),
              0 12px 28px rgb(88 101 242 / 0.26),
              0 2px 14px rgb(255 255 255 / 0.04);
          }

          html:not(.dark) [data-choose-path] .path-card-discord:hover {
            background:
              linear-gradient(rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.96)) padding-box,
              linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.75),
              0 0 0 1px rgb(88 101 242 / 0.14),
              0 12px 28px rgb(88 101 242 / 0.18),
              0 2px 10px rgb(0 0 0 / 0.06);
          }

          [data-choose-path] .section-header {
            background: rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-choose-path] .section-header {
            background: rgb(0 0 0 / 0.045);
          }

          [data-choose-path] .comparison-header {
            background: rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-choose-path] .comparison-header {
            background: rgb(0 0 0 / 0.045);
          }

          [data-choose-path] .comparison-table {
            border-collapse: separate;
            border-spacing: 0;
          }

          [data-choose-path] .comparison-table th,
          [data-choose-path] .comparison-table td {
            border-inline-start: 1px solid var(--color-fd-border);
            border-bottom: 1px solid var(--color-fd-border);
            padding: 1rem;
            text-align: start;
            vertical-align: top;
          }

          [data-choose-path] .comparison-table th:first-child,
          [data-choose-path] .comparison-table td:first-child {
            border-inline-start: 0;
          }

          [data-choose-path] .comparison-table tbody tr:last-child td {
            border-bottom: 0;
          }

          [data-choose-path] .choose-button {
            border-color: transparent;
            border-radius: 0.625rem;
            color: white;
          }

          [data-choose-path] .choose-button-cloud {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.02) 44%, rgb(0 0 0 / 0.1)),
              linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.18),
              inset 0 -1px 0 rgb(0 0 0 / 0.16),
              0 5px 12px rgb(94 62 216 / 0.2);
          }

          [data-choose-path] .path-card:hover .choose-button-cloud {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.04) 44%, rgb(0 0 0 / 0.08)),
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.22),
              inset 0 -1px 0 rgb(0 0 0 / 0.14),
              0 6px 14px rgb(104 72 226 / 0.24);
          }

          [data-choose-path] .choose-button-discord {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.03) 46%, rgb(0 0 0 / 0.1)),
              linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.18),
              inset 0 -1px 0 rgb(0 0 0 / 0.14),
              0 5px 12px rgb(88 101 242 / 0.2);
          }

          [data-choose-path] .path-card:hover .choose-button-discord {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.2), rgb(255 255 255 / 0.05) 46%, rgb(0 0 0 / 0.08)),
              linear-gradient(135deg, #96a3ff 0%, #6774ff 52%, #5865f2 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.22),
              inset 0 -1px 0 rgb(0 0 0 / 0.12),
              0 6px 14px rgb(88 101 242 / 0.28);
          }

          .dark [data-choose-path] .choose-button {
            border: 0 !important;
            background-clip: padding-box;
          }

          .dark [data-choose-path] .choose-button-cloud {
            background: linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow: 0 5px 12px rgb(94 62 216 / 0.22);
          }

          .dark [data-choose-path] .path-card:hover .choose-button-cloud {
            background: linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%);
            box-shadow: 0 6px 14px rgb(104 72 226 / 0.28);
          }

          .dark [data-choose-path] .choose-button-discord {
            background: linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%);
            box-shadow: 0 5px 12px rgb(88 101 242 / 0.22);
          }

          .dark [data-choose-path] .path-card:hover .choose-button-discord {
            background: linear-gradient(135deg, #96a3ff 0%, #6774ff 52%, #5865f2 100%);
            box-shadow: 0 6px 14px rgb(88 101 242 / 0.3);
          }
        `}
      </style>

      <section className="rounded-lg border border-fd-border bg-fd-background/70">
        <div className="section-header flex items-center gap-2 border-b border-fd-border px-4 py-3 text-sm font-semibold text-fd-foreground">
          <ArrowsRight className="size-4" weight="Filled" aria-hidden="true" />
          <span>The short version</span>
        </div>
        <div className="p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
          Self-hosted and Cloud use the same Coolify features. The choice is only who operates the Coolify instance:
          you manage it yourself, or Coolify manages it for you.
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="relative overflow-auto prose-no-margin">
          <table className="comparison-table w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="comparison-header">
                <th className="w-[28%] font-semibold text-fd-muted-foreground">Area</th>
                <th className="w-[36%] font-semibold text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <Server className="size-4" weight="Filled" aria-hidden="true" />
                    <span>Self-hosted</span>
                  </div>
                </th>
                <th className="w-[36%] font-semibold text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <Cloud className="size-4" weight="Filled" aria-hidden="true" />
                    <span>Coolify Cloud</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.area}>
                  <td className="font-medium text-fd-foreground">{row.area}</td>
                  <td className="leading-6 text-fd-muted-foreground">{row.selfHosted}</td>
                  <td className="leading-6 text-fd-muted-foreground">{row.cloud}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {paths.map((path) => (
          <PathCard key={path.title} path={path} />
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="section-header flex items-center gap-2 border-b border-fd-border px-4 py-3 text-sm font-semibold text-fd-foreground">
          <Checklist2 className="size-4" weight="Filled" aria-hidden="true" />
          <span>Why this choice matters</span>
        </div>
        <div className="flex flex-col gap-5 p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Both paths give you the same core product experience, but they differ in who is responsible for operating and maintaining the Coolify instance.
          </p>
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Coolify Cloud includes a monthly subscription for the managed instance, while self-hosted lets you run it yourself without recurring platform fees.
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="section-header flex items-center gap-2 border-b border-fd-border px-4 py-3 text-sm font-semibold text-fd-foreground">
          <Warning22 className="size-4" style={{ color: '#f59e0b' }} weight="Filled" aria-hidden="true" />
          <span>Still unsure?</span>
        </div>
        <div className="p-4 sm:p-5">
          <p className="m-0 text-base font-semibold leading-7 text-fd-foreground">
            Start with Self-hosted if you are comfortable operating the control plane.
          </p>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
            Self-hosted gives you the clearest ownership model from day one. Choose Cloud when you want the Coolify team to handle the instance maintenance for you.
          </p>
        </div>
      </section>
    </div>
  );
}

type Path = (typeof paths)[number];

function PathCard({ path }: { path: Path }) {
  const Icon = path.icon;

  return (
    <Link
      href={path.href}
      className={`path-card path-card-${path.cta} group block h-full rounded-lg border border-fd-border bg-fd-background/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1`}
    >
      <article className="flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-muted/40 transition-colors group-hover:bg-fd-muted/60">
            <Icon className="size-5 text-fd-foreground" weight="Filled" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="m-0 text-base font-semibold text-fd-foreground">{path.title}</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
          {path.bestWhen}
        </p>

        <ul className="mt-4 space-y-2">
          {path.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
              <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <span className={`choose-button choose-button-${path.cta} mt-5 inline-flex w-fit items-center gap-2 border px-3 py-2 text-sm font-semibold transition`}>
          Choose {path.title.replace(' Coolify', '')}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </article>
    </Link>
  );
}
