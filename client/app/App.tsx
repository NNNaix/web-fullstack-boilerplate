import React, { FC, ReactNode } from 'react';
import { hot } from 'react-hot-loader/root';
import zhCn from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout, { BASIC_LAYOUT } from './infra/Layout/LayoutWrapper';
import RouteContainer from './infra/RouteContainer';
import ErrorBoundary from './infra/ErrorBoundary/ErrorBoundary';
import { masterStore, MasterStoreProvider } from './store';

const Provider: FC<{ children: ReactNode }> = ({ children }) => (
    <MasterStoreProvider value={masterStore}>
        <ConfigProvider locale={zhCn}>{children}</ConfigProvider>
    </MasterStoreProvider>
);

const App: FC = () => {
    const layoutType = BASIC_LAYOUT;
    return (
        <div className="app">
            <Provider>
                <ErrorBoundary>
                    <Router>
                        <Layout layoutType={layoutType}>
                            <RouteContainer />
                        </Layout>
                    </Router>
                </ErrorBoundary>
            </Provider>
        </div>
    );
};

export default hot(App);
