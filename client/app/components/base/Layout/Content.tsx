import React, { FC } from 'react';
import { Layout } from 'antd';
import { LayoutProps as BaseContentProps } from 'antd/es/layout';

const { Content: BaseContent } = Layout;
export type ContentProps = BaseContentProps;

const Content: FC<ContentProps> = (props) => <BaseContent {...props} />;

export default Content;
