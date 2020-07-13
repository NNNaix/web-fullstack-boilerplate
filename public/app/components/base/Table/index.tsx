import React from 'react';

import { Table as BaseTable } from 'antd';
import { ColumnProps as BaseColumnsProps, TableProps as BaseTableProps } from 'antd/es/table';

export type TableProps<RecordType> = BaseTableProps<RecordType>;
export type ColumnProps<T = any> = BaseColumnsProps<T>;

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
    return <BaseTable {...props} />;
}

export default Table;
