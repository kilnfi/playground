import React from 'react';

type THeadProps = {
  children: any,
};

type TBodyProps = {
  children: any,
};

type HeadProps = {
  children: any,
  className?: string,
};

type RowProps = {
  children: any,
  className?: string,
};

type CellProps = {
  children: any,
  className?: string,
};

const THead = ({ children }: THeadProps) => {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
};

const TBody = ({ children }: TBodyProps) => {
  // Striped rows
  const rows = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      className: index % 2 === 0 ? '' : 'bg-gray-50'
    });
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
};

const Head = ({ children, className = '' }: HeadProps) => {
  return (
    <th scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
};

const Row = ({ children, className = '' }: RowProps) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};

const Cell = ({ children, className = '' }: CellProps) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
};

type Props = {
  className?: string,
  children: any,
}

const Table = ({ children, className = '' }: Props) => {
  return (
    <div className={`-my-2 -mx-8 overflow-x-auto laptop:overflow-x-visible ${className}`}>
      <div
        className="my-2 align-middle inline-block min-w-full px-8">
        <div
          className="bg-white shadow border-b border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
};

Table.THead = THead;
Table.TBody = TBody;
Table.Head = Head;
Table.Row = Row;
Table.Cell = Cell;

export default Table;
