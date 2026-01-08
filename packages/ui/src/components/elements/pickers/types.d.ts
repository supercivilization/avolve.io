import type { DropzoneOptions } from 'react-dropzone'

// Type for expo-image-picker MediaTypeOptions (used on native)
type MediaTypeOptions = 'All' | 'Videos' | 'Images'

export type DropZoneOptionsCustom = Omit<DropzoneOptions, 'accept'> & {
  // native only
  onOpen: DropzoneOptions['onDrop']
  // native only
  allowsEditing?: boolean
  mediaTypes?: MediaTypeOptions[]
}
