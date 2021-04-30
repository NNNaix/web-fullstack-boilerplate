import { defaultsDeep, isArray, isObject } from 'lodash';
import Joi, { AnySchema, ObjectSchema } from 'joi';

import type { Setting } from '@server/infra/setting/sections';
import { DEFAULT_EMPTY, SettingSection } from '@server/infra/setting/setting.constants';

type OverrideSchema<S> = {
    [key in keyof S]?: S[key] extends Exclude<S[key], any[]> & Record<string, unknown>
        ? OverrideSchema<S[key]>
        : AnySchema;
};

function haveChildSetting(value: any): boolean {
    return isObject(value) && !isArray(value);
}

function haveChildSettingSchema(value: any) {
    return haveChildSetting(value) && !Joi.isSchema(value);
}

function withDefault<S extends Record<string, any>>(
    defaultSettingSection: S,
    overrideSchema: OverrideSchema<S>,
) {
    Object.keys(overrideSchema).forEach((k: keyof typeof overrideSchema) => {
        if (haveChildSettingSchema(overrideSchema[k])) {
            overrideSchema[k] = Joi.object(
                withDefault(defaultSettingSection[k], overrideSchema[k] as any),
            ).default(defaultSettingSection[k]) as any;
        } else {
            (overrideSchema[k] as AnySchema).default(defaultSettingSection[k]);
        }
    });
    return overrideSchema;
}

function getDefaultSchemaByType(value: any) {
    switch (typeof value) {
        case 'boolean': {
            return Joi.boolean().default(value);
        }
        case 'number': {
            return Joi.number().default(value);
        }
        case 'string': {
            return Joi.string().allow(DEFAULT_EMPTY).default(value);
        }
        default: {
            return Joi.any().default(value);
        }
    }
}

function generateDefaultSchema<S extends Record<string, any>>(
    defaultSettingSection: S,
    overrideSchema: OverrideSchema<S>,
) {
    const sectionSchema: { [key in keyof S]?: AnySchema } = {};
    for (const key in defaultSettingSection) {
        if (Object.prototype.hasOwnProperty.call(defaultSettingSection, key)) {
            sectionSchema[key] =
                haveChildSetting(defaultSettingSection[key]) && overrideSchema[key] !== undefined
                    ? generateDefaultSchema(defaultSettingSection[key], overrideSchema[key] as any)
                    : getDefaultSchemaByType(defaultSettingSection[key]);
        }
    }
    return defaultsDeep(withDefault(defaultSettingSection, overrideSchema), sectionSchema);
}

export default function generateSettingSectionDefaultSchema<
    K extends SettingSection,
    S extends Setting[K]
>(
    settingSection: K,
    defaultSettingSection: S,
    overrideSchema = {} as OverrideSchema<S>,
): { [key in K]: ObjectSchema<S> } {
    return {
        [settingSection]: Joi.object(generateDefaultSchema(defaultSettingSection, overrideSchema)),
    } as { [key in K]: ObjectSchema<S> };
}
