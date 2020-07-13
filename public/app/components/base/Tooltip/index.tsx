import React, { FC } from 'react';
import { Tooltip as BaseTooltip } from 'antd';
import { TooltipProps as BaseTooltipProps } from 'antd/es/tooltip';

type TooltipProps = BaseTooltipProps;

const Tooltip: FC<TooltipProps> = (props) => {
    return <BaseTooltip {...props} />;
};

export default Tooltip;
