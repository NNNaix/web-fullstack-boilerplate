import React, { FC } from 'react';
import { Layout as BaseLayout } from 'antd';
import { LayoutProps as BaseLayoutProps } from 'antd/es/layout';

import Sider, { SiderProps } from './Sider';
import Content, { ContentProps } from './Content';
import Header, { HeaderProps } from './Header';
import Footer, { FooterProps } from './Footer';

export type LayoutProps = BaseLayoutProps;
type LayoutComponent = FC<LayoutProps> & {
    Header: FC<HeaderProps>;
    Sider: FC<SiderProps>;
    Content: FC<ContentProps>;
    Footer: FC<FooterProps>;
};

const Layout: LayoutComponent = (props) => {
    return <BaseLayout {...props} />;
};
Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
