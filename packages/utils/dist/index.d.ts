export { NOOP, toRawType } from '@vue/shared';
import { Plugin, AppContext, EmitsOptions, SetupContext, Directive } from 'vue';

/**
 * 转换时间成字符串
 */
declare function parseTime(time: Date | string | number, cFormat?: string): string;

type SFCWithInstall<T> = T & Plugin;
type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null;
};
type EmitFn<E extends EmitsOptions> = SetupContext<E>['emit'];

declare function withInstall<T, E extends Record<string, any>>(main: T, extra?: E): SFCWithInstall<T> & E;
declare function withInstallFunction<T>(fn: T, name: string): SFCInstallWithContext<T>;
declare function withInstallDirective<T extends Directive>(directive: T, name: string): SFCWithInstall<T>;
declare function withNoopInstall<T>(component: T): SFCWithInstall<T>;

export { parseTime, withInstall, withInstallDirective, withInstallFunction, withNoopInstall };
export type { EmitFn, SFCInstallWithContext, SFCWithInstall };
