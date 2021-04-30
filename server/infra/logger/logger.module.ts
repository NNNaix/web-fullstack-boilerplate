import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {
    // static forRoot(options: LogSectionSetting): DynamicModule{
    //     return  {
    //         global: true,
    //         module: LoggerModule,
    //         providers: [LoggerService, {
    //             provide: LOGGER_OPTION,
    //             useValue: options
    //         }],
    //         exports: [LoggerService]
    //     }
    // }
}
