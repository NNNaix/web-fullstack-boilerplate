import React from 'react';
import { List as BaseList } from 'antd';
import { ListProps as BaseListProps } from 'antd/es/list';

const { Item: BaseItem } = BaseList;

type ListProps<T> = BaseListProps<T>;

function List<T>(props: ListProps<T>) {
    return <BaseList {...props} />;
}

List.Item = BaseItem;
export default List;
