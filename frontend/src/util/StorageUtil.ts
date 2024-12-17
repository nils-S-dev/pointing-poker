import { Nullable } from "../types/Nullable";

class Storage {

    constructor(
        private key: string
    ) {}

    set(val: string): void {
        window.localStorage.setItem(this.key, val);
    }

    get(): Nullable<string> {
        return window.localStorage.getItem(this.key);
    }

}

export const tokenStorage = new Storage("$token");
export const nameStorage = new Storage("$name");