export class GetBreeds {
  static readonly type = '[Cat] Get Breeds'
}

export class SearchCats {
  static readonly type = '[Cat] Search Cats'
  constructor(
    public breedId: string,
    public limit: number
  ) {}
}
