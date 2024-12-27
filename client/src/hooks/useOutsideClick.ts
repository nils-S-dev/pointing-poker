import React from "react";
import { RefObject } from "react";

export function useOutsideClick<T extends Element>(ref: RefObject<T>, callback: () => void) {
    React.useEffect(() => {
        function handleOutsideClick(event: Event) {
            if (ref?.current && event.target instanceof HTMLElement && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [ref]);
}