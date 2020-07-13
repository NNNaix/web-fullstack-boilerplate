import React, { FC } from 'react';
import { Tabs as BaseTabs } from 'antd';
import { TabsProps as BaseTabsProps, TabPaneProps as BaseTabPaneProps } from 'antd/es/tabs';

const { TabPane: BaseTabPane } = BaseTabs;

export type TabsProps = BaseTabsProps;
export type TabPaneProps = BaseTabPaneProps;
type TabsComponent = FC<TabsProps> & {
    TabPane: typeof BaseTabPane;
};

const Tabs: TabsComponent = (props) => <BaseTabs {...props} />;

Tabs.TabPane = BaseTabPane;

export default Tabs;
