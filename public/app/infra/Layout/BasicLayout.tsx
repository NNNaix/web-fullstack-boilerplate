import React, { FC, ReactNode } from 'react';
import { Layout } from 'antd';
import ErrorBoundary from '@app/infra/ErrorBoundary/ErrorBoundary';
import GlobalHeader from '../GlobalHeader/GlobalHeader';
import SiderMenu from '../GlobalSider/GlobalSider';

const { Content } = Layout;

const BasicLayout: FC = ({ children }: { children?: ReactNode }) => {
    return (
        <Layout>
            <GlobalHeader />
            <Layout>
                <SiderMenu />
                <Content className="main-container">
                    <ErrorBoundary>{children}</ErrorBoundary>
                </Content>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;
