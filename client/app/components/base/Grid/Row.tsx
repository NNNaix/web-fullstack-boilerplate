import React, { FC } from 'react';
import { Row as BaseRow } from 'antd';
import { RowProps as BaseRowProps } from 'antd/es/row';

type RowProps = BaseRowProps;
const Row: FC<RowProps> = (props) => <BaseRow {...props} />;

export default Row;
