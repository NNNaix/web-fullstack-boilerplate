import { RouteProps } from 'react-router-dom';
import routeList from '../../routes';

class RootRouterRegistry {
    routes: RouteProps[];
    constructor(routes: RouteProps[]) {
        this.routes = routes;
    }
    update(routes: RouteProps[]) {
        this.routes = routes;
    }

    getRoutes(): RouteProps[] {
        return this.routes;
    }
}

const rootRootRegistry = new RootRouterRegistry(routeList);

export default rootRootRegistry;
