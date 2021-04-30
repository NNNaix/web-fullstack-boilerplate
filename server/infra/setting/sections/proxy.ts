import { DEFAULT_EMPTY, SettingSection, Switch } from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface ProxySectionSetting {
    enable: boolean;
    context: string;
    target: string;
    changeOrigin: boolean;
}

export const ProxySectionSettingSchema = generateSettingSectionDefaultSchema(SettingSection.PROXY, {
    enable: Switch.OFF,
    context: DEFAULT_EMPTY,
    target: DEFAULT_EMPTY,
    changeOrigin: Switch.ON,
});
