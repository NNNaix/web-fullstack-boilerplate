import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SettingService } from './setting.service';
import loadConfiguration from './load';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [loadConfiguration],
        }),
    ],
    providers: [ConfigService, SettingService],
    exports: [ConfigService, SettingService],
})
export class SettingModule {}
