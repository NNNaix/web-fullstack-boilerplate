import React, { FC } from 'react';
import { Upload as BaseUpload } from 'antd';
import { UploadProps as BaseUploadProps } from 'antd/es/upload';

export type UploadProps = BaseUploadProps;

const Upload: FC<UploadProps> = (props) => {
    return <BaseUpload {...props} />;
};

export default Upload;
