import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesStore } from './store/recipes.store';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  store = inject(RecipesStore);
  ngOnInit(): void {}
  title = 'signal-store-recipes';
}
