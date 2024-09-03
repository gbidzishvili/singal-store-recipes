import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesStore } from './store/recipes.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  store = inject(RecipesStore);
  ngOnInit(): void {
    // this.store.loadAll().subscribe((v) => console.log('ereek+leqso'));
  }
  title = 'signal-store-recipes';
}
