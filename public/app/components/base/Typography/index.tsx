import React, { FC } from 'react';
import { Typography as BaseTypography } from 'antd';
import { TypographyProps as BaseTypographyProps } from 'antd/es/typography';

const { Text, Title, Paragraph } = BaseTypography;

export type TypographyProps = BaseTypographyProps;
type TypographyComponent = FC<TypographyProps> & {
    Text: typeof Text;
    Title: typeof Title;
    Paragraph: typeof Paragraph;
};
const Typography: TypographyComponent = (props) => {
    return <BaseTypography {...props} />;
};

Typography.Paragraph = Paragraph;
Typography.Title = Title;
Typography.Text = Text;

export default Typography;
