import React, { FC } from 'react';
import { Divider as BaseDivider } from 'antd';
import { DividerProps as BaseDividerProps } from 'antd/es/divider';

export type DividerProps = BaseDividerProps;

const Divider: FC<DividerProps> = (props) => <BaseDivider {...props} />;

export default Divider;
