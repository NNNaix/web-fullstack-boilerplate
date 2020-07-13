import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@app/components/base';

import SiderMenu, { MenuItemProps } from '@app/infra/GlobalSider/Menu';

const { Sider } = Layout;

const getTopMenuSection = (): MenuItemProps[] => [
    {
        title: 'home',
        path: '/',
        icon: 'home',
    },
];
const getMiddleMenuSection = (): MenuItemProps[] => [];

const getBottomMenuSection = (): MenuItemProps[] => [];

const WIDTH = 260;

const GlobalSider = () => {
    const topMenuSection = getTopMenuSection();
    const middleMenuSection = getMiddleMenuSection();
    const bottomMenuSection = getBottomMenuSection();
    const menuData = [topMenuSection, middleMenuSection, bottomMenuSection];
    const { pathname } = useLocation();
    const selectedKeys = [pathname];
    return (
        <Sider className="sider-menu" width={WIDTH} theme="light">
            <SiderMenu selectedKeys={selectedKeys} menuData={menuData} />
        </Sider>
    );
};

export default GlobalSider;
