import { useEffect } from 'react';

export function useDebouncedCallback<T>(
    value: T,
    callback: (value: T) => void,
    delay: number = 300
) {
    useEffect(() => {
        const handler = setTimeout(() => {
            callback(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);
}
