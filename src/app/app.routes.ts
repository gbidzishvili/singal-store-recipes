import { Routes } from '@angular/router';
import { AppUrlEnum } from './core/const/route-enums';
import { RecipeResolver } from './views/details-pg/resolver/recipe.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home-pg/home-pg.component').then(
        (m) => m.HomePgComponent
      ),
  },
  {
    path: `${AppUrlEnum.ADD}`,
    loadComponent: () =>
      import('./views/add-recipe-pg/add-recipe-pg.component').then(
        (m) => m.AddRecipePgComponent
      ),
  },
  {
    path: `${AppUrlEnum.EDIT}`,
    loadComponent: () =>
      import('./views/edit-recipe-pg/edit-recipe-pg.component').then(
        (m) => m.EditRecipePgComponent
      ),
  },
  {
    path: `${AppUrlEnum.DETAILS}`,
    loadComponent: () =>
      import('./views/details-pg/details-pg.component').then(
        (m) => m.DetailsPgComponent
      ),
    resolve: { recipe: RecipeResolver },
  },
];
