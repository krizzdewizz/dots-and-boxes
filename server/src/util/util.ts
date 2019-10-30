export function copyObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function sleep(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
}