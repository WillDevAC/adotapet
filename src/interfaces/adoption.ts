export interface IIdoption {
  createdAt: string;
  updatedAt: string;
  id: number;
  userOwner: UserOwner;
  petAdopted: PetAdopted;
  reqCode: string;
  reqStatus: string;
  adoptionDate: any;
  adoptionActive: boolean;
  reason: any;
  answers: Answer[];
}

export interface UserOwner {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
  job: string;
  income: number;
  typeResidence: string;
  freeTime: number;
  childAtHome: boolean;
  petAtHome: boolean;
  age: any;
  sex: any;
  verified: boolean;
  active: boolean;
  profilePicture: any;
  deletedAt: any;
  role: string;
  localTitle: any;
  fullAddress: string;
  description: any;
  cep: any;
  latitude: any;
  longitude: any;
  city: any;
}

export interface PetAdopted {
  createdAt: string;
  updatedAt: any;
  id: number;
  name: string;
  tag: string;
  qrCodePath: any;
  description: string;
  age: number;
  hasOwner: boolean;
  lost: boolean;
  active: boolean;
  profilePicture: string;
  deletedAt: any;
  user: User;
  color: Color;
  size: Size;
  race: Race;
  specie: Specie2;
  sex: string;
  weight: number;
  neutered: boolean;
  dewormed: boolean;
  images: Image[];
  usersWhoLiked: UsersWhoLiked[];
  likesCount: number;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: any;
  job: any;
  income: any;
  typeResidence: any;
  freeTime: any;
  childAtHome: any;
  petAtHome: any;
  age: any;
  sex: string;
  verified: boolean;
  active: boolean;
  profilePicture: any;
  deletedAt: any;
  role: string;
  localTitle: any;
  fullAddress: any;
  description: any;
  cep: any;
  latitude: any;
  longitude: any;
  city: City;
}

export interface City {
  id: number;
  name: string;
  state: State;
}

export interface State {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  colorName: string;
  colorHexadecimal: string;
}

export interface Size {
  id: number;
  sizeName: string;
}

export interface Race {
  id: number;
  raceName: string;
  specie: Specie;
}

export interface Specie {
  id: number;
  specieName: string;
}

export interface Specie2 {
  id: number;
  specieName: string;
}

export interface Image {
  id: number;
  path: string;
  text: any;
}

export interface UsersWhoLiked {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
  job: string;
  income: number;
  typeResidence: string;
  freeTime: number;
  childAtHome: boolean;
  petAtHome: boolean;
  age: number;
  sex: string;
  verified: boolean;
  active: boolean;
  profilePicture: any;
  deletedAt: any;
  role: string;
  localTitle: any;
  fullAddress: any;
  description: any;
  cep: any;
  latitude: any;
  longitude: any;
  city: City2;
}

export interface City2 {
  id: number;
  name: string;
  state: State2;
}

export interface State2 {
  id: number;
  name: string;
}

export interface Answer {
  createdAt: string;
  updatedAt: string;
  id: number;
  text: string;
  question: Question;
}

export interface Question {
  id: number;
  text: string;
  info: string;
  entity: string;
}
