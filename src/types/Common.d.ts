export interface ConstantsInterface {
    [key: string]: string;
}

export interface ReduxComponentInterface {
    actions: { [key: string]: (...args: any[]) => Action };
}