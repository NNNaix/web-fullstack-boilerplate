import React, { FC } from 'react';
import { Skeleton as BaseSkeleton } from 'antd';
import { SkeletonProps as BaseSkeletonProps } from 'antd/es/skeleton';

export type SkeletonProps = BaseSkeletonProps;

const Skeleton: FC<SkeletonProps> = (props) => <BaseSkeleton {...props} />;

export default Skeleton;
