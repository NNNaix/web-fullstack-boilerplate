import { flow, IMSTArray, IMSTMap, ISimpleType } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/types/type';
import { isFunction } from '@app/utils/common';

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
    return <Args extends any[]>(loadWatcherKey: string, fn: (...args: Args) => Promise<any>) =>
        autoContextFlow(self, loadWatcherKey, fn);
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

export type MSTPrimaryValue = number | string | boolean | any;

type MapPrimaryValueType<S, K extends keyof S> = S[K] extends MSTPrimaryValue ? S[K] : never;

export function generateMSTPrimaryUpdateFn<S extends Record<string, any>, K extends keyof S>(
    target: S,
    key: K,
) {
    return function fn(props: UpdateFnPropsType<MapPrimaryValueType<S, K>>) {
        if (isFunction(props)) {
            fn(props(target[key]));
        } else {
            target[key] = props;
        }
    };
}
