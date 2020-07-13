import React, { forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';

interface IconProps extends HTMLProps<any> {
    type: string;
}

const Icon = forwardRef<HTMLElement, IconProps>(
    ({ type, className, ...restProps }: IconProps, ref) => {
        return <i ref={ref} className={classNames('iconfont', type, className)} {...restProps} />;
    },
);
Icon.displayName = 'Icon';
export default Icon;
