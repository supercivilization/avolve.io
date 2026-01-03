import type { shorthands } from '@tamagui/shorthands'
import { config } from './tamagui.config'

export type Conf = typeof config
export type Shorthands = typeof shorthands

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
  interface TamaguiShorthands extends Shorthands {}
}

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
  interface TamaguiShorthands extends Shorthands {}
}

export default config
