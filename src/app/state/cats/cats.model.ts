export interface CatStateModel {
  breeds: Breed[]
  cats: Cat[]
  loading: boolean
}

export interface Cat {
  id: string
  url: string
  width: string
  height: string
}

export interface Breed {
  id: string
  name: string
}
