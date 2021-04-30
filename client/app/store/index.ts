/**
 * @See https://github.com/mobxjs/mobx-react-lite/#observer-batching
 */
import 'mobx-react-lite/batchingForReactDom';
import { createContext, useContext } from 'react';
import { Instance, types } from 'mobx-state-tree';

const masterModelProperties = {
    /** todo set router store */
    example: types.optional(types.frozen(), {}),
};
const masterModel = types.model(masterModelProperties);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type MasterStoreInstance = Instance<typeof masterModel>;

export const masterStore = masterModel.create({
    example: {},
});

const MasterStoreContext = createContext<null | MasterStoreInstance>(null);
export const { Provider: MasterStoreProvider } = MasterStoreContext;

type ScopeType = keyof typeof masterModelProperties;

export function useMasterStore(): MasterStoreInstance;
export function useMasterStore<T extends ScopeType>(scope?: T): MasterStoreInstance[T];
export function useMasterStore(scope?: ScopeType): any {
    const store = useContext(MasterStoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }
    if (scope) {
        if (!store[scope]) {
            throw new Error(`Store have no property that named: ${scope}`);
        } else {
            return store[scope];
        }
    }
    return store;
}
