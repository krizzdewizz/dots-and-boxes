export function copyObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function sleep(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
}

export function log(...args: any[]) {
    console.log(new Date(Date.now()).toISOString(), ...args);
}

export function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
