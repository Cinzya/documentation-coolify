'use client';

import Link from 'fumadocs-core/link';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

interface MediaCardProps {
  title: string;
  description?: string;
  href?: string;
  imageSrc: string;
  imageAlt?: string;
}

export function MediaCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt = title,
}: MediaCardProps) {
  const content = (
    <>
      {href ? (
        <MediaImage imageSrc={imageSrc} imageAlt={imageAlt} />
      ) : (
        <ImageZoom src={imageSrc} alt={imageAlt}>
          <MediaImage imageSrc={imageSrc} imageAlt={imageAlt} zoomable />
        </ImageZoom>
      )}
      <div className="px-4 py-3">
        <h2 className="not-prose !m-0 text-base font-medium">{title}</h2>
        {description ? <p className="my-0! mt-1 text-sm text-fd-muted-foreground">{description}</p> : null}
      </div>
    </>
  );

  const className =
    'block overflow-hidden rounded-xl border bg-fd-card text-fd-card-foreground transition-colors hover:bg-fd-accent/80';

  if (href) {
    return (
      <Link href={href} data-card className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div data-card className={className}>
      {content}
    </div>
  );
}

function MediaImage({
  imageSrc,
  imageAlt,
  zoomable,
}: {
  imageSrc: string;
  imageAlt: string;
  zoomable?: boolean;
}) {
  return (
    // biome-ignore lint/performance/noImgElement: static export
    <img
      src={imageSrc}
      alt={imageAlt}
      className={['not-prose !m-0 block aspect-video w-full object-cover', zoomable ? 'cursor-zoom-in' : '']
        .filter(Boolean)
        .join(' ')}
    />
  );
}
