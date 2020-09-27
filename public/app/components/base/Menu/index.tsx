import React, { FC } from 'react';
import { Menu as BaseMenu } from 'antd';
import { MenuProps as BaseMenuProps, ClickParam as BaseClickParam } from 'antd/es/menu';

const { Item: BaseItem } = BaseMenu;

export type MenuProps = BaseMenuProps;
type MenuComponent = FC<MenuProps> & {
    Item: typeof BaseItem;
};
export type ClickParam = BaseClickParam;

const Menu: MenuComponent = (props) => {
    return <BaseMenu {...props} />;
};
Menu.Item = BaseItem;

export default Menu;
