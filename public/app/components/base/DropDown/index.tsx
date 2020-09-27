import React, { FC } from 'react';
import { Dropdown as BaseDropDown } from 'antd';
import { DropDownProps as BaseDropDownProps } from 'antd/es/dropdown';

export type DropDownProps = BaseDropDownProps;

const DropDown: FC<DropDownProps> = (props) => {
    return <BaseDropDown {...props} />;
};

export default DropDown;
