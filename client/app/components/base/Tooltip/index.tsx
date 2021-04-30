import React, { FC } from 'react';
import { Tooltip as BaseTooltip } from 'antd';
import { TooltipProps as BaseTooltipProps } from 'antd/es/tooltip';

export type TooltipProps = BaseTooltipProps;

const Tooltip: FC<TooltipProps> = (props) => <BaseTooltip {...props} />;

export default Tooltip;
