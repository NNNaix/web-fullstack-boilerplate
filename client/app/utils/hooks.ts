import { Context, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';

export function useStack<T>(initStack: T[]) {
    const [stack, setStack] = useState<T[]>(initStack);
    const push = (item: T | T[]) => {
        setStack(stack.concat(Array.isArray(item) ? item : [item]));
    };
    const pop = (len: number) => {
        setStack(stack.slice(stack.length - len - 1));
    };

    return { stack, push, pop };
}

export function useDomSelector(selector: string): MutableRefObject<HTMLElement | undefined> {
    const domElement = useRef<HTMLElement>();
    useEffect(() => {
        !domElement.current &&
            (domElement.current = document.querySelector(selector) as HTMLElement);
    }, [selector]);
    return domElement;
}

type ContextReturnType<T> = T extends Context<infer U> ? U : never;
export function useSafeContext<T extends Context<any>>(c: T): NonNullable<ContextReturnType<T>> {
    const context = useContext(c);
    if (!context) {
        throw new Error(
            'Component used a uninitialized DocDirectoryTreeContext, please provide a context value.',
        );
    }
    return context;
}
