import {
    info as infoSymbol,
    success as successSymbol,
    error as errorSymbol,
    warning as warningSymbol,
} from 'log-symbols';

const LF = '';

function str(message: string, symbol?: string | boolean) {
    return symbol ? `${LF} ${symbol} ${message}` : `${LF} ${message}`;
}
function log(message: string) {
    console.info(str(message));
}
function info(message: string) {
    console.info(str(message, infoSymbol));
}
function warning(message: string) {
    console.warn(str(message, warningSymbol));
}
function success(message: string) {
    console.info(str(message, successSymbol));
}

function error(message: string) {
    console.error(str(message, errorSymbol));
}

export { log, info, warning, success, error };
