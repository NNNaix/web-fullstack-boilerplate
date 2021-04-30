import { Module } from '@nestjs/common';
import { SettingModule } from '@server/infra/setting/setting.module';
import { LoggerModule } from '@server/infra/logger/logger.module';
import { ViewModule } from '@server/infra/view/view.module';

@Module({
    imports: [SettingModule, LoggerModule, ViewModule],
})
export class AppModule {}
