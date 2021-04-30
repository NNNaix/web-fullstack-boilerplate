import { RouteProps } from 'react-router-dom';
import { lazy } from 'react';
/** direct load routes */
import Home from './Home';
import routeMeta from './routeMeta';

/** lazy load routes */

const NoMatch = lazy(() => import('./DownGrade/NoMatch'));

/**
 * Note:
 * default all routes use 'exact' pattern.
 */
/**
 * Note:
 * default all routes use 'exact' pattern.
 */
const componentMap = {
    home: Home,
    '*': NoMatch,
};
const routes: (RouteProps & { key: string })[] = routeMeta.map(({ key, path }) => ({
    path,
    key,
    component: componentMap[key as keyof typeof componentMap],
}));

export default routes;
