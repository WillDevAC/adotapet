export interface ICategories {
  sex: string[]
  specie: Specie[]
  race: Race[]
  size: Size[]
  color: Color[]
}

export interface Specie {
  id: number
  specieName: string
}

export interface Race {
  id: number
  raceName: string
  specie: Specie
}

export interface Size {
  id: number
  sizeName: string
}

export interface Color {
  id: number
  colorName: string
  colorHexadecimal: string
}
