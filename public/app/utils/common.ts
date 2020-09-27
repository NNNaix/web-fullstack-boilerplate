// eslint-disable-next-line import/prefer-default-export

import moment from 'moment';
import { DATE_FORMAT } from '@app/utils/const';

export function dateSorter<T = any>(a: T, b: T): number {
    if (moment(a).isBefore(moment(b))) {
        return -1;
    }
    return 1;
}

export function commonTimeFormatting(t: string) {
    return moment(t).local().format(DATE_FORMAT);
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
            m[k] = decodeURIComponent(v);
        });
    } catch (error) {
        // console.error(error);
    } finally {
        return m;
    }
}

export function isFunction(fn: any): fn is Function {
    return typeof fn === 'function';
}

export function sizeTransformer(size: number) {
    const B = 1;
    const KB = 1024 * B;
    const MB = 1024 * KB;
    const GB = 1024 * MB;
    const TB = 1024 * GB;

    if (size > TB) {
        return `${(size / TB).toFixed(2)} TB`;
    }
    if (size > GB) {
        return `${(size / GB).toFixed(2)} GB`;
    }
    if (size > MB) {
        return `${(size / MB).toFixed(2)} MB`;
    }
    return `${(size / KB).toFixed(2)} KB`;
}

export function downloadFileFromUrl(url: string, fileName: string) {
    // create link
    const link = document.createElement('a');
    link.style.display = 'none';

    link.href = url;
    link.download = fileName;
    // dispatch click event on link
    let event;
    try {
        event = new MouseEvent('click');
    } catch (error) {
        event = document.createEvent('MouseEvent');
        event.initMouseEvent(
            'click',
            true,
            true,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null,
        );
    }
    link.dispatchEvent(event);
}

export function downloadFileFromLocal(bits: string, fileName: string) {
    // Trying to get file name from response header
    // const content = response.headers.get('Content-Disposition')
    // let contentParts = [];
    //
    // if (content) {
    //     contentParts = content.replace(/["']/g, '').match(/filename\*?=([^;]+)/);
    // }
    // const fileName =  contentParts && contentParts.length >= 1 ? contentParts[1] : Date.now();
    const options = { type: 'application/octet-stream' };
    let file: any;
    try {
        file = new File([bits], fileName, options);
    } catch (error) {
        file = new Blob([bits], options);
        file.name = fileName;
        file.lastModifiedDate = new Date();
    }
    // native IE
    if ('msSaveOrOpenBlob' in window.navigator) {
        window.navigator.msSaveOrOpenBlob(file, fileName);
    }

    const objectUrl = window.URL.createObjectURL(file);
    // create link
    downloadFileFromUrl(objectUrl, fileName);
    setTimeout(() => {
        (window.URL || window.webkitURL || window).revokeObjectURL(objectUrl);
    }, 1000 * 60);
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 */
export function getTextWidth(
    t: string,
    font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" ',
) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.font = font;
    const metrics = context.measureText(t);
    return metrics.width;
}
getTextWidth.canvas = document.createElement('canvas');
