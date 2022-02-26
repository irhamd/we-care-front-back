import { acakText, ubahText } from "../Crypto";

export let Cache = {
    set(name, value) {
        sessionStorage.setItem(name, acakText(value));
    },
    remove(name) {
        sessionStorage.removeItem(name);
    },
    get(name) {
        try {
            return ubahText(sessionStorage.getItem(name));
        } catch (error) {
            return ""
        }
    }
}


