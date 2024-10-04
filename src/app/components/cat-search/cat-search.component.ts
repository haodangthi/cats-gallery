import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { MatOption } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { Observable } from 'rxjs'
import { Breed, Cat, CatState, GetBreeds, SearchCats } from '../../state'
import { Store } from '@ngxs/store'
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner'
import { MatSelect } from '@angular/material/select'

@Component({
  selector: 'app-cat-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatGridList,
    MatGridTile,
    NgOptimizedImage,
    NgForOf,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButton,
    AsyncPipe,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.scss'],
})
export class CatSearchComponent implements OnInit {
  public searchForm: FormGroup

  breeds$!: Observable<Breed[]>
  cats$!: Observable<Cat[]>
  loading$!: Observable<boolean>

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.searchForm = this.fb.group({
      breed: [''],
      limit: [10],
    })
  }

  public ngOnInit() {
    this.breeds$ = this.store.select(CatState.breeds)
    this.cats$ = this.store.select(CatState.cats)
    this.loading$ = this.store.select(CatState.loading)

    this.store.dispatch(new GetBreeds()).subscribe({
      next: (res) => console.log('Breeds fetched:', res),
      error: (err) => console.error('Error fetching breeds:', err),
    })

    this.breeds$.subscribe((breeds) => console.log('Breeds:', breeds))
    this.cats$.subscribe((cats) => console.log('Cats:', cats))
  }

  public onSearch() {
    const { breed, limit } = this.searchForm.value

    this.store.dispatch(new SearchCats(breed, limit))
  }
}
