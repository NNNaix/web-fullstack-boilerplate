import React, { ReactChild, ReactText } from 'react';
import { Select as BaseSelect } from 'antd';
import type { SelectProps as BaseSelectProps, SelectValue } from 'antd/es/select';

type SelectProps<T> = BaseSelectProps<T>;
export type SelectOptionType = { label: ReactChild; value: ReactText };
function Select<T extends SelectValue>(props: SelectProps<T>) {
    return <BaseSelect {...props} />;
}

export default Select;
