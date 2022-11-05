import * as React from 'react';
import hoistNonReactStatics = require('./hoist-non-react-statics');

type $Without<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
type $DeepPartial<T> = { [P in keyof T]?: $DeepPartial<T[P]> };

export type ThemingType<Theme> = {
  ThemeProvider: React.ComponentTypeWithRef<{ theme?: Theme }>;
  withTheme: <Props extends { theme: Theme }, C>(
    WrappedComponent: React.ComponentType<Props> & C
  ) => React.ComponentType<
    $Without<Props, 'theme'> & { theme?: $DeepPartial<Theme> }
  > &
    hoistNonReactStatics.NonReactStatics<typeof WrappedComponent>;
  useTheme<T = Theme>(overrides?: $DeepPartial<T>): T;
};

export const createTheming: <Theme>(defaultTheme: Theme) => ThemingType<Theme>;
