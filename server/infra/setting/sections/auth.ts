import {
    DEFAULT_EMPTY,
    DEFAULT_SESSION_NAME,
    SettingSection,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface AuthSectionSetting {
    loginCookieName: string;
    signoutRedirectUrl: string;
    loginUrl: string;
}

export const AuthSectionSettingSchema = generateSettingSectionDefaultSchema(SettingSection.AUTH, {
    loginCookieName: DEFAULT_SESSION_NAME,
    signoutRedirectUrl: DEFAULT_EMPTY,
    loginUrl: DEFAULT_EMPTY,
});
