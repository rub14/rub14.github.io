import { useState } from "react"

export const useLocalStorage = (key: string, initialValue: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    })

    const setValue = (value: string) => {
        try {
            setStoredValue(value);

            if (typeof window !== 'undefined')
                localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }
    return [storedValue, setValue]
}