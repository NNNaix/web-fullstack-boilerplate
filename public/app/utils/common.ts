// eslint-disable-next-line import/prefer-default-export
export function numSorter(a: number, b: number): number {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}

export function toUrlSearchMap(search: string): { [key: string]: string } {
    let m: { [key: string]: string } = {};
    try {
        if (search[0] !== '?') {
            throw new Error(`${search} is not a valid url search string with prefix '?'`);
        }
        const s = search.slice(1);
        const p = s.split('&');
        p.forEach((pv) => {
            const [k, v] = pv.split('=');
            if (!v) {
                m = {};
                throw new Error(`${search} can not parse the url search to key-value pair`);
            }
            m[k] = v;
        });
    } catch (error) {
        // console.error(error);
    } finally {
        return m;
    }
}
