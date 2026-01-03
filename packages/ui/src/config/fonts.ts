import { createInterFont } from '@tamagui/font-inter'
import { createFont } from 'tamagui'

export const monoFont = createFont({
  family: 'monospace',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 22,
    9: 30,
    10: 42,
    11: 52,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 124,
  },
  lineHeight: {
    1: 17,
    2: 18,
    3: 19,
    4: 20,
    5: 22,
    6: 24,
    7: 26,
    8: 28,
    9: 36,
    10: 48,
    11: 58,
    12: 68,
    13: 78,
    14: 98,
    15: 120,
    16: 130,
  },
  weight: {
    4: '400',
    7: '700',
  },
  letterSpacing: {
    4: 0,
    7: -1,
  },
})

export const silkscreenFont = createFont({
  family: 'system-ui',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 22,
    9: 30,
    10: 42,
    11: 52,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 124,
  },
  lineHeight: {
    1: 17,
    2: 18,
    3: 19,
    4: 20,
    5: 22,
    6: 24,
    7: 26,
    8: 28,
    9: 36,
    10: 48,
    11: 58,
    12: 68,
    13: 78,
    14: 98,
    15: 120,
    16: 130,
  },
  weight: {
    4: '400',
    7: '700',
  },
  letterSpacing: {
    4: 0,
    7: -1,
  },
})

export const headingFont = createInterFont(
  {
    size: {
      6: 15,
    },
    transform: {
      6: 'uppercase',
      7: 'none',
    },
    weight: {
      3: '500',
      4: '700',
    },
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => size,
    sizeLineHeight: (fontSize) => fontSize + 4,
  }
)

export const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => size + 5,
  }
)
