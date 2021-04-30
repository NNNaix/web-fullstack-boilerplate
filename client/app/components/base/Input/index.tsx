import React, { FC } from 'react';
import { Input as BaseInput } from 'antd';
import { InputProps as BaseInputProps } from 'antd/es/input';

const { Group, Search, Password, TextArea } = BaseInput;

export type InputProps = BaseInputProps;
type InputComponent = FC<InputProps> & {
    Group: typeof Group;
    Search: typeof Search;
    Password: typeof Password;
    TextArea: typeof TextArea;
};

const Input: InputComponent = (props) => <BaseInput {...props} />;

Input.Group = Group;
Input.Search = Search;
Input.Password = Password;
Input.TextArea = TextArea;

export default Input;
