export function simpanKeStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function muatDariStorage(key, defaultData) {
    const data = localStorage.getItem(key);

    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            return defaultData;
        }
    }

    simpanKeStorage(key, defaultData);
    return defaultData;
}