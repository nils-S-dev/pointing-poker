import { Nullable } from "../types/Nullable";

class Storage {

    constructor(
        private key: string
    ) {}

    setValue(val: string): void {
        window.localStorage.setItem(this.key, val);
    }

    getValue(): Nullable<string> {
        return window.localStorage.getItem(this.key);
    }

}

export const tokenStorage = new Storage("$token");