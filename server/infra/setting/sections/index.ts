import Joi from 'joi';
import {
    ServerSectionSetting,
    ServerSectionSettingSchema,
} from '@server/infra/setting/sections/server';
import { LogSectionSetting, LogSectionSettingSchema } from '@server/infra/setting/sections/logging';
import { AuthSectionSetting, AuthSectionSettingSchema } from '@server/infra/setting/sections/auth';
import {
    ProxySectionSetting,
    ProxySectionSettingSchema,
} from '@server/infra/setting/sections/proxy';

export const SettingSchema = Joi.object({
    ...ServerSectionSettingSchema,
    ...LogSectionSettingSchema,
    ...AuthSectionSettingSchema,
    ...ProxySectionSettingSchema,
});

export interface Setting {
    server: ServerSectionSetting;
    auth: AuthSectionSetting;
    log: LogSectionSetting;
    proxy: ProxySectionSetting;
}

// use camel case name style
export type TOMLAvailableValue =
    | number
    | string
    | boolean
    | [string | number | boolean]
    | { [key: string]: any };
