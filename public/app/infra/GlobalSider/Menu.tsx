import React, { FC } from 'react';
import { Divider, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Icon } from '@app/components/base';

export interface MenuItemProps {
    title: string;
    path: string;
    icon: string;
}

export type MenuSectionType = MenuItemProps[];

interface SiderMenuProps {
    selectedKeys: string[];
    menuData: MenuSectionType[];
}

export const LastPathRecorder = {
    storageKey: 'lastPath',
    get() {
        localStorage.getItem(this.storageKey);
    },
    set(path: string) {
        localStorage.setItem(this.storageKey, path);
    },
};

function to(path: string) {
    LastPathRecorder.set(path);
    return path;
}

const getMenuItems = (menuData: MenuItemProps[]) => {
    return menuData.map(({ title, path, icon }) => (
        <Menu.Item key={path} title={title} className="sider-menu-item">
            <Link to={to(path)}>
                <Icon type={icon} style={{ paddingRight: 13 }} />
                <span className="">{title}</span>
            </Link>
        </Menu.Item>
    ));
};

const SiderMenu: FC<SiderMenuProps> = ({ selectedKeys, menuData }) => {
    return (
        <div className="global-sider-menu">
            {menuData.map((menuSection, i) => (
                <div key={menuSection[0].path} className="global-sider-menu-section">
                    <Menu selectedKeys={selectedKeys}>{getMenuItems(menuSection)}</Menu>
                    {i !== menuData.length - 1 && (
                        <div style={{ padding: '0 20px' }}>
                            <Divider style={{ margin: '20px 0' }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SiderMenu;
