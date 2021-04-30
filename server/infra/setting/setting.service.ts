import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Setting, SettingSchema } from '@server/infra/setting/sections';
import { immutable, ImmutableType } from '@server/util/common';
import { SettingSection } from '@server/infra/setting/setting.constants';
import { ServerSectionSetting } from '@server/infra/setting/sections/server';
import { LogSectionSetting } from '@server/infra/setting/sections/logging';
import { AuthSectionSetting } from '@server/infra/setting/sections/auth';
import { ProxySectionSetting } from '@server/infra/setting/sections/proxy';

type ImmutableSetting = ImmutableType<Setting>;

/**
 * Setting Service
 * All section setting is immutable after instantiated by design.
 * @TODO For future if we need modify some setting in application runtime, we will add mutable runtime setting module to support it.
 */
@Injectable()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class SettingService implements ImmutableSetting {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly server: ImmutableSetting[SettingSection.SERVER];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly log: ImmutableSetting[SettingSection.LOG];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly auth: ImmutableSetting[SettingSection.AUTH];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly proxy: ImmutableSetting[SettingSection.PROXY];

    private readonly logger: LoggerService = new Logger('Setting');

    constructor(private configService: ConfigService<Setting>) {
        const validatedSetting = this.validate();
        Object.values(SettingSection).forEach((section) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this[section] = this.getPostHandleSectionsSetting(section, validatedSetting[section]);
        });
    }

    get<T extends SettingSection>(section: T): Setting[T] {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (this[section] as unknown) as any;
    }

    private validate() {
        const { error, value, warning } = SettingSchema.validate(
            (Object.values(SettingSection) as SettingSection[]).reduce((p, c) => {
                p[c] = this.configService.get(c) ?? {};
                return p;
            }, {} as Record<SettingSection, Record<string, unknown>>),
            { abortEarly: false, allowUnknown: false, presence: 'optional', debug: true },
        );
        error && this.logger.error(error.message);
        warning && this.logger.warn(warning.message);
        return value as Setting;
    }

    private getPostHandleSectionsSetting<S extends SettingSection>(
        section: S,
        sectionSetting: Setting[S],
    ) {
        switch (section) {
            case SettingSection.SERVER: {
                return this.postHandleServerSectionSetting(sectionSetting as ServerSectionSetting);
            }
            case SettingSection.LOG: {
                return this.postHandleLogSectionSetting(sectionSetting as LogSectionSetting);
            }
            case SettingSection.AUTH: {
                return this.postHandleAuthSectionSetting(sectionSetting as AuthSectionSetting);
            }
            case SettingSection.PROXY: {
                return this.postHandleProxySectionSetting(sectionSetting as ProxySectionSetting);
            }
            default: {
                return null;
            }
        }
    }

    /**
     * Because toml do not support reference syntax by design, so the best practice to use reference value is generating in application level.
     * @see discussion at
     *  1. https://github.com/toml-lang/toml/issues/612
     *  2. https://github.com/toml-lang/toml/issues/528
     */
    private postHandleServerSectionSetting(
        serverSetting: Setting[SettingSection.SERVER],
    ): ImmutableSetting[SettingSection.SERVER] {
        const { protocol, domain, httpPort, appSubUrl } = serverSetting;
        /** add server root url depends on other url component */
        serverSetting.rootUrl = `${protocol}://${domain}:${httpPort}/${appSubUrl}`;
        return immutable(serverSetting);
    }
    private postHandleLogSectionSetting(
        logSetting: Setting[SettingSection.LOG],
    ): ImmutableSetting[SettingSection.LOG] {
        return immutable(logSetting);
    }
    private postHandleAuthSectionSetting(
        authSetting: Setting[SettingSection.AUTH],
    ): ImmutableSetting[SettingSection.AUTH] {
        return immutable(authSetting);
    }

    private postHandleProxySectionSetting(
        proxySetting: Setting[SettingSection.PROXY],
    ): ImmutableSetting[SettingSection.PROXY] {
        return immutable(proxySetting);
    }
}
