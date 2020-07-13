import React, { FC } from 'react';
import BasicLayout from './BasicLayout';

export const BASIC_LAYOUT = 'basic';
export type LayoutType = typeof BASIC_LAYOUT;
export interface LayoutWrapperInterface {
    layoutType?: LayoutType;
}

const LayoutWrapper: FC<LayoutWrapperInterface> = ({ layoutType = BASIC_LAYOUT, children }) => {
    switch (layoutType) {
        case BASIC_LAYOUT: {
            return <BasicLayout>{children}</BasicLayout>;
        }
        default: {
            return <BasicLayout>{children}</BasicLayout>;
        }
    }
};

export default LayoutWrapper;
