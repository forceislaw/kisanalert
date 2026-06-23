export interface PestSeed {
  key_name: string
  scientific_name: string
  danger_level: 'low' | 'moderate' | 'high' | 'critical'
}

export const PESTS: PestSeed[] = [
  { key_name: 'pink_bollworm', scientific_name: 'Pectinophora gossypiella', danger_level: 'critical' },
  { key_name: 'fall_armyworm', scientific_name: 'Spodoptera frugiperda', danger_level: 'critical' },
  { key_name: 'aphids', scientific_name: 'Aphis gossypii', danger_level: 'moderate' },
  { key_name: 'whitefly', scientific_name: 'Bemisia tabaci', danger_level: 'high' },
  { key_name: 'thrips', scientific_name: 'Thrips tabaci', danger_level: 'moderate' },
  { key_name: 'pod_borer', scientific_name: 'Helicoverpa armigera', danger_level: 'high' },
  { key_name: 'mealybug', scientific_name: 'Planococcus citri', danger_level: 'moderate' },
  { key_name: 'red_hairy_caterpillar', scientific_name: 'Amsacta albistriga', danger_level: 'high' },
  { key_name: 'wheat_rust', scientific_name: 'Puccinia triticina', danger_level: 'high' },
  { key_name: 'brown_plant_hopper', scientific_name: 'Nilaparvata lugens', danger_level: 'critical' },
  { key_name: 'stem_borer', scientific_name: 'Chilo partellus', danger_level: 'high' },
  { key_name: 'leaf_blast', scientific_name: 'Magnaporthe grisea', danger_level: 'high' },
]

export function getPestIndex(keyName: string): number {
  return PESTS.findIndex(p => p.key_name === keyName)
}
