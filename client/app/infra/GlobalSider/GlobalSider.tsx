import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@app/components/base';

import SiderMenu from '@app/infra/GlobalSider/Menu';

const { Sider } = Layout;

const WIDTH = 260;

const GlobalSider = () => {
    const { pathname } = useLocation();
    const selectedKeys = [pathname];
    return (
        <Sider className="sider-menu" width={WIDTH} theme="light">
            <SiderMenu selectedKeys={selectedKeys} />
        </Sider>
    );
};

export default GlobalSider;
