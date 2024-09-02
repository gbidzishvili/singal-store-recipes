import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, of } from 'rxjs';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { RecipesStore } from '../../store/recipes.store';
@Component({
  selector: 'app-details-pg',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './details-pg.component.html',
})
export class DetailsPgComponent extends Unsubscriber implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(RecipesStore);
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: any) =>
          params.id ? this.store.getRecipeById(params.id) : of(null)
        )
      )
      .subscribe(console.log);
  }
}
