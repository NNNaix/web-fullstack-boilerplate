import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Icon, Menu } from '@app/components/base';
import { globalConfig } from '@app/utils/const';

enum MenuSection {
    TOP = 'TOP',
    MIDDLE = 'MIDDLE',
    BOTTOM = 'BOTTOM',
}

export interface MenuItemProps {
    title: string;
    path: string;
    icon?: string;
    section: MenuSection;
}

interface SiderMenuProps {
    selectedKeys: string[];
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
    return menuData.map(({ title, path, icon = '' }) => (
        <Menu.Item key={path} title={title} className="sider-menu-item">
            <Link data-allowed-element-when-alerting to={to(path)}>
                <Icon type={icon} style={{ paddingRight: 13 }} />
                <span>{title}</span>
            </Link>
        </Menu.Item>
    ));
};

const SiderMenu: FC<SiderMenuProps> = ({ selectedKeys }) => {
    const menuList = globalConfig.menu;
    const topMenuSection = menuList.filter((menuItem) => menuItem.section === MenuSection.TOP);
    const middleMenuSection = menuList.filter(
        (menuItem) => menuItem.section === MenuSection.MIDDLE,
    );
    const bottomMenuSection = menuList.filter(
        (menuItem) => menuItem.section === MenuSection.BOTTOM,
    );
    const menuSectionList = [topMenuSection, middleMenuSection, bottomMenuSection].filter(
        (section) => !!section.length,
    );

    return (
        <div className="global-sider-menu">
            {menuSectionList.map((menuSection, i) => (
                <div key={menuSection[0].path} className="global-sider-menu-section">
                    <Menu selectedKeys={selectedKeys}>{getMenuItems(menuSection)}</Menu>
                    {i !== menuSectionList.length - 1 && (
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
