import React, { FC } from 'react';
import { Button as BaseButton } from 'antd';

import { ButtonProps as BaseButtonProps } from 'antd/es/button';

type ButtonProps = BaseButtonProps;

const Button: FC<ButtonProps> = (props) => <BaseButton {...props} />;

export default Button;
