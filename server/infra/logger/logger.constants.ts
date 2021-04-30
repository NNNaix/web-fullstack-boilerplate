import { Logger } from '@nestjs/common';

export const LOGGER_OPTION = Symbol('LOGGER_OPTION');
export const boostrapLogger = new Logger('Boostrap');
