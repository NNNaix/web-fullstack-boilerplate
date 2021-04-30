import { isObject } from 'lodash';

const IMMUTABLE_FLAG = Symbol('immutable');
type ImmutableFlagType = { [IMMUTABLE_FLAG]?: boolean };
type PrimitiveValue = number | string | boolean | undefined;
type PrimitiveObject<T = any> = Record<string | symbol | number, T>;
export type ImmutableType<T extends PrimitiveObject> = {
    readonly [P in keyof T]:
        | (T[P] extends ImmutableFlagType ? T[P] : ImmutableType<T[P]> | PrimitiveObject)
        | PrimitiveValue;
} &
    ImmutableFlagType;

export function immutable<T extends PrimitiveObject, K extends keyof T>(obj: T): ImmutableType<T> {
    return new Proxy(obj, {
        get: function getImmutableObj(target: T, p: keyof T): ImmutableType<T[K]> | PrimitiveValue {
            if (p in target) {
                if (isObject(target[p]) && !target[p][IMMUTABLE_FLAG]) {
                    target[p][IMMUTABLE_FLAG] = true;
                    return (target[p] = immutable(target[p]) as T[K]);
                }
                return target[p];
            }
            return undefined;
        },
        set: function setImmutableObj(target: T, p: string | symbol): boolean {
            throw new Error(
                `Can not set the property: "${String(p)}" of ${JSON.stringify(
                    target,
                )}, this object is immutable.`,
            );
        },
        deleteProperty(target: T, p: string | symbol): boolean {
            throw new Error(
                `Can not delete the property: "${String(p)}" of ${JSON.stringify(
                    target,
                )}, this object is immutable.`,
            );
        },
        setPrototypeOf(target: T, v: Record<string, unknown> | null): boolean {
            throw new Error(`Can not override the prototype of a immutable object. 
            target: ${JSON.stringify(target)}
            
            newPrototype: ${JSON.stringify(v)}
            `);
        },
        isExtensible(): boolean {
            return false;
        },
    });
}
