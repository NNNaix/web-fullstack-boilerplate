import React, { FC } from 'react';
import { Space as BaseSpace } from 'antd';
import { SpaceProps as BaseSpaceProps } from 'antd/es/space';

export type SpaceProps = BaseSpaceProps;

const Space: FC<SpaceProps> = (props) => {
    return <BaseSpace {...props} />;
};

export default Space;
