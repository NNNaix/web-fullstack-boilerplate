import { IMSTMap, ISimpleType, flow, IMSTArray } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/typings/type';

export function autoContextFlow<
    Args extends any[],
    S extends { loadWatcher: IMSTMap<ISimpleType<boolean>> } = any
>(self: S, loadWatcherKey: string, fn: (...args: Args) => Promise<any>) {
    return flow(function* (...args: Args) {
        let response: Promise<any> | undefined;
        try {
            self.loadWatcher.set(loadWatcherKey, true);
            response = yield fn(...args);
        } catch (error) {
            console.error(error);
            !response && (response = Promise.reject(error));
        } finally {
            self.loadWatcher.set(loadWatcherKey, false);
            return response;
        }
    });
}

export function generateAutoContextFlowWithSelf<
    S extends { loadWatcher: IMSTMap<ISimpleType<boolean>> } = any
>(self: S) {
    return autoContextFlow.bind(null, self);
}

export function generateMSTArrayUpdateFn<T extends any>(target: IMSTArray<ISimpleType<T>>) {
    return function fn(props: UpdateFnPropsType<T[]>) {
        if (typeof props === 'function') {
            fn(props(target.toJS()));
        } else {
            target.clear();
            target.push(...props);
        }
    };
}
type MSTPrimaryValue =
    | number
    | string
    | boolean
    | undefined
    | null
    | { [key: string]: any }
    | any[];

type MapPrimaryValueType<S, K extends keyof S> = S[K] extends MSTPrimaryValue ? S[K] : never;

export function generateMSTPrimaryUpdateFn<S, K extends keyof S>(target: S, key: K) {
    return function fn(props: UpdateFnPropsType<MapPrimaryValueType<S, K>>) {
        if (typeof props === 'function') {
            fn(props(target[key]));
        } else {
            console.log(props);
            target[key] = props;
        }
    };
}
