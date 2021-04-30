import React, { FC, RefObject } from 'react';
import { Layout } from 'antd';
import { SiderProps as BaseSiderProps } from 'antd/es/layout';

const { Sider: BaseSider } = Layout;
export interface SiderProps extends BaseSiderProps {
    ref?: RefObject<any>;
}

const Sider: FC<SiderProps> = (props) => <BaseSider {...props} />;

export default Sider;
