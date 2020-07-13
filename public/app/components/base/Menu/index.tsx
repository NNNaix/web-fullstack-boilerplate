import React, { FC } from 'react';
import { Menu as BaseMenu } from 'antd';
import { MenuProps as BaseMenuProps } from 'antd/es/menu';

const { Item: BaseItem } = BaseMenu;

type MenuProps = BaseMenuProps;
type MenuComponent = FC<MenuProps> & {
    Item: typeof BaseItem;
};

const Menu: MenuComponent = (props) => {
    return <BaseMenu {...props} />;
};
Menu.Item = BaseItem;

export default Menu;
