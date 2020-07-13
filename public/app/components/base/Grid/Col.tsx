import React, { FC } from 'react';
import { Col as BaseCol } from 'antd';
import { ColProps as BaseColProps } from 'antd/es/col';

type ColProps = BaseColProps;
const Col: FC<ColProps> = (props) => <BaseCol {...props} />;

export default Col;
