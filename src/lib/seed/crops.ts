export interface CropSeed {
  key_name: string
}

export const CROPS: CropSeed[] = [
  { key_name: 'cotton' },
  { key_name: 'soybean' },
  { key_name: 'groundnut' },
  { key_name: 'jowar' },
  { key_name: 'bajra' },
  { key_name: 'tur' },
  { key_name: 'chili' },
  { key_name: 'sugarcane' },
  { key_name: 'grapes' },
  { key_name: 'pomegranate' },
  { key_name: 'maize' },
  { key_name: 'sunflower' },
  { key_name: 'wheat' },
  { key_name: 'rice' },
  { key_name: 'banana' },
  { key_name: 'mango' },
  { key_name: 'coconut' },
  { key_name: 'onion' },
  { key_name: 'potato' },
  { key_name: 'tomato' },
  { key_name: 'tea' },
  { key_name: 'coffee' },
  { key_name: 'mustard' },
  { key_name: 'sesame' },
  { key_name: 'gram' },
  { key_name: 'barley' },
  { key_name: 'moong' },
  { key_name: 'urad' },
  { key_name: 'masoor' },
  { key_name: 'tapioca' },
]

export function getCropIndex(keyName: string): number {
  return CROPS.findIndex(c => c.key_name === keyName)
}
