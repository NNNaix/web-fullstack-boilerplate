import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import rootRootRegistry from './utils';

const Fallback = () => <p>加载中...</p>;

const RouteContainer = () => {
    const routes = rootRootRegistry.getRoutes();
    return (
        <div className="route-container">
            <Suspense fallback={<Fallback />}>
                <Switch>
                    {routes.map(({ exact, ...routeProps }) => (
                        <Route
                            key={routeProps.path?.toString()}
                            {...routeProps}
                            exact={exact ?? true}
                        />
                    ))}
                </Switch>
            </Suspense>
        </div>
    );
};

export default RouteContainer;
