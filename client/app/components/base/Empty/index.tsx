import React, { FC } from 'react';
import { Empty as BaseEmpty } from 'antd';
import { EmptyProps as BaseEmptyProps } from 'antd/es/empty';

export type EmptyProps = BaseEmptyProps;

const Empty: FC<EmptyProps> = (props) => <BaseEmpty {...props} />;

export default Empty;
