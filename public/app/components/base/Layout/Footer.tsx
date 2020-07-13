import React, { FC } from 'react';
import { Layout } from 'antd';
import { LayoutProps as BaseFooterProps } from 'antd/es/layout';

const { Footer: BaseFooter } = Layout;
export type FooterProps = BaseFooterProps;

const Footer: FC<FooterProps> = (props) => {
    return <BaseFooter {...props} />;
};

export default Footer;
