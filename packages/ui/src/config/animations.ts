import { createAnimations } from '@tamagui/animations-css'

export const animations = createAnimations({
  '100ms': 'ease-out 100ms',
  '200ms': 'ease-out 200ms',
  bouncy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms',
  lazy: 'ease-out 600ms',
  quick: 'cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms',
  quicker: 'cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms',
  quickest: 'cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms',
  medium: 'cubic-bezier(0.4, 0, 0.2, 1) 300ms',
  slow: 'ease-in-out 500ms',
  tooltip: 'cubic-bezier(0.175, 0.885, 0.32, 1.275) 250ms',
})
