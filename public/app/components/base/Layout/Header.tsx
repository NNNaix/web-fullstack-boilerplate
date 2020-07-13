import React, { FC } from 'react';
import { Layout } from 'antd';
import { LayoutProps as BaseHeaderProps } from 'antd/es/layout';

const { Header: BaseHeader } = Layout;
export type HeaderProps = BaseHeaderProps;

const Header: FC<HeaderProps> = (props) => {
    return <BaseHeader {...props} />;
};

export default Header;
