import React, { FC } from 'react';
import { Radio as BaseRadio } from 'antd';
import { RadioProps as BaseRadioProps } from 'antd/es/radio';

const { Group, Button } = BaseRadio;
export type RadioProps = BaseRadioProps;
type RadioComponent = FC<RadioProps> & {
    Group: typeof Group;
    Button: typeof Button;
};

const Radio: RadioComponent = (props) => {
    return <BaseRadio {...props} />;
};
Radio.Button = Button;
Radio.Group = Group;

export default Radio;
