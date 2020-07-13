import React, { FC } from 'react';

import { Breadcrumb as BaseBreadcrumb } from 'antd';
import {
    BreadcrumbProps as BaseBreadcrumProps,
    BreadcrumbItemProps as BaseBreadcrumbItemProps,
} from 'antd/es/breadcrumb';

const { Item: BaseItem, Separator: BaseSeparator } = BaseBreadcrumb;
export type BreadcrumbProps = BaseBreadcrumProps;
export type BreadcrumbItemProps = BaseBreadcrumbItemProps;
type BreadcrumbComponent = FC<BreadcrumbProps> & {
    Item: typeof BaseItem;
    Separator: typeof BaseSeparator;
};

const Breadcrumb: BreadcrumbComponent = (props) => {
    return <BaseBreadcrumb {...props} />;
};
Breadcrumb.Item = BaseItem;
Breadcrumb.Separator = BaseSeparator;

export default Breadcrumb;
