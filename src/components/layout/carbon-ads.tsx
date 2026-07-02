'use client';

import { useEffect, useRef } from 'react';

const carbonCode = 'CW7IPKJJ';
const carbonPlacement = 'coolifyio';

function pruneCarbonAds(container: HTMLDivElement) {
  const ads = Array.from(container.querySelectorAll<HTMLElement>('[id^="carbonads"]'));

  for (const ad of ads.slice(1)) {
    ad.remove();
  }
}

export function CarbonAds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.offsetParent === null) return;

    container.innerHTML = '';

    const observer = new MutationObserver(() => {
      pruneCarbonAds(container);
    });

    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.async = true;
    script.id = '_carbonads_js';
    script.src = `https://cdn.carbonads.com/carbon.js?serve=${carbonCode}&placement=${carbonPlacement}`;
    script.type = 'text/javascript';

    container.appendChild(script);

    return () => {
      observer.disconnect();
      container.innerHTML = '';
    };
  }, []);

  return (
    <aside className="carbon-ads max-xl:hidden" aria-label="Advertisement">
      <div ref={containerRef} />
    </aside>
  );
}
