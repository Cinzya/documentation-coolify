import type React from 'react';
import { cn } from '@/lib/ui/cn';
import { renderCoolLinkValue } from './cool-inline-content';
import type { CoolIcon } from './cool-types';

type CoolTableColumn = {
  header: React.ReactNode;
  icon?: CoolIcon;
};

type CoolTableProps = React.ComponentProps<'div'> & {
  columns: CoolTableColumn[];
  noWrapColumns?: number[];
  rows: React.ReactNode[][];
};

export function CoolTable({ className, columns, noWrapColumns = [], rows, ...props }: CoolTableProps) {
  return (
    <div
      data-cool-docs
      className={cn(
        'not-prose my-3 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70 [&_a]:font-semibold [&_a]:text-fd-foreground [&_a]:underline [&_a]:decoration-fd-primary [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:decoration-fd-primary/70',
        className,
      )}
      {...props}
    >
      <div className="relative overflow-auto prose-no-margin">
        <table className="comparison-table w-full min-w-[42rem] text-sm sm:min-w-0">
          <thead>
            <tr className="comparison-header">
              {columns.map((column, index) => {
                const Icon = column.icon;

                return (
                  <th
                    key={index}
                    className={[
                      index === 0 ? 'font-semibold text-fd-muted-foreground' : 'font-semibold text-fd-foreground',
                      noWrapColumns.includes(index) ? 'whitespace-nowrap' : '',
                    ].join(' ')}
                  >
                    <span className="flex items-center gap-2">
                      {Icon ? <Icon className="size-4 shrink-0" weight="Filled" aria-hidden={true} /> : null}
                      <span>{column.header}</span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={[
                      cellIndex === 0 ? 'font-medium text-fd-foreground' : 'leading-6 text-fd-muted-foreground',
                      noWrapColumns.includes(cellIndex) ? 'whitespace-nowrap' : '',
                    ].join(' ')}
                  >
                    {renderCoolLinkValue(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
