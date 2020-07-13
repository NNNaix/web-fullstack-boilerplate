import { Dispatch, SetStateAction } from 'react';

export function tuple<T extends string[] | number[]>(...args: T): T;
export function tuple(...args: any) {
    return args;
}
export type ActionType<State> = Dispatch<SetStateAction<State>>;
export type UpdateFnPropsType<State> = State | ((origin: State) => State);
export type UpdateFnType<State> = (props: UpdateFnPropsType<State>) => void;
export type ComposeEnum<K extends keyof any> = {
    [P in K]: P;
};
