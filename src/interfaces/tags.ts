export interface ITag {
  id: number
  profilePicture: any
  name: string
  tag: string
  description: string
  age: any
  owner: Owner
  color: any
  size: Size
  race: any
  specie: any
  sex: string
  weight: number
  neutered: any
  dewormed: any
  createdAt: string
  updatedAt: string
  images: any[]
}

export interface Owner {
  id: number
  createdAt: string
  updatedAt: string
  email: string
  name: string
  cpf: any
  phone: any
  birthDate: any
  job: any
  income: any
  typeResidence: any
  freeTime: any
  childAtHome: any
  petAtHome: any
  age: any
  sex: any
  verified: boolean
  active: boolean
  profilePicture: any
  deletedAt: any
  role: string
  localTitle: any
  fullAddress: any
  description: any
  cep: any
  latitude: any
  longitude: any
  city: any
}

export interface Size {
  id: number
  sizeName: string
}
