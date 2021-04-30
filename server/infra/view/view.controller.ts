import { Controller, Get, Render } from '@nestjs/common';
import { SettingService } from '@server/infra/setting/setting.service';
import { SettingSection } from '@server/infra/setting/setting.constants';
import { menuData } from '@server/util/consts';

@Controller()
export class ViewController {
    constructor(private settingService: SettingService) {}

    @Get()
    @Render('index')
    index() {
        // const { loginCookieName } = this.settingService.get(SettingSection.AUTH);
        const { appSubUrl, appViewTitle } = this.settingService.get(SettingSection.SERVER);
        return {
            appSubUrl,
            appViewTitle,
            dataLayer: { menu: menuData },
        };
    }
}
