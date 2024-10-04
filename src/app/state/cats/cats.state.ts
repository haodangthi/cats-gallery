import { State, Action, StateContext, Selector } from '@ngxs/store'
import { GetBreeds, SearchCats } from './cats.actions'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'
import { CatStateModel } from './cats.model'
import { CatService } from '../../services/cat.service'

@State<CatStateModel>({
  name: 'cats',
  defaults: {
    breeds: [],
    cats: [],
    loading: false,
  },
})
@Injectable()
export class CatState {
  constructor(private catService: CatService) {}

  @Selector()
  static breeds(state: CatStateModel) {
    return state.breeds
  }

  @Selector()
  static cats(state: CatStateModel) {
    return state.cats
  }

  @Selector()
  static loading(state: CatStateModel) {
    return state?.loading
  }

  @Action(GetBreeds)
  getBreeds(ctx: StateContext<CatStateModel>) {
    ctx.patchState({ loading: true })

    return this.catService.getBreeds().pipe(
      tap((breeds) => {
        ctx.patchState({ breeds, loading: false })
      })
    )
  }

  @Action(SearchCats)
  searchCats(ctx: StateContext<CatStateModel>, action: SearchCats) {
    ctx.patchState({ loading: true })

    return this.catService.getCatsByBreed(action.breedId, action.limit).pipe(
      tap((cats) => {
        ctx.patchState({ cats, loading: false })
      })
    )
  }
}
