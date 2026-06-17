import type { ReactNode } from 'react';

interface MediaCardGroupProps {
  children: ReactNode;
}

export function MediaCardGroup({ children }: MediaCardGroupProps) {
  return <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>;
}
