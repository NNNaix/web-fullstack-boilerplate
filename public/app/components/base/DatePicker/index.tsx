import React, { FC } from 'react';
import { DatePicker as BaseDatePicker } from 'antd';
import { DatePickerProps as BaseDatePickerProps } from 'antd/es/date-picker';

const { RangePicker: BaseRangePicker } = BaseDatePicker;
type DatePickerComponent = FC<BaseDatePickerProps> & {
    RangePicker: typeof BaseRangePicker;
};

const DatePicker: DatePickerComponent = (props) => {
    return <BaseDatePicker {...props} />;
};
DatePicker.RangePicker = BaseRangePicker;

export default DatePicker;
