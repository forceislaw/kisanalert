export interface CropSeed {
  key_name: string
}

export const CROPS: CropSeed[] = [
  { key_name: 'cotton' },
  { key_name: 'soybean' },
  { key_name: 'tur' },
  { key_name: 'jowar' },
  { key_name: 'bajra' },
  { key_name: 'groundnut' },
  { key_name: 'sugarcane' },
  { key_name: 'grapes' },
  { key_name: 'pomegranate' },
  { key_name: 'chilli' },
  { key_name: 'maize' },
  { key_name: 'sunflower' },
  { key_name: 'wheat' },
  { key_name: 'rice' },
]

export function getCropIndex(keyName: string): number {
  return CROPS.findIndex(c => c.key_name === keyName)
}
