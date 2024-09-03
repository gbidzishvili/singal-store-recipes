import { CanDeactivateFn } from '@angular/router';
import { AddRecipePgComponent } from '../../views/add-recipe-pg/add-recipe-pg.component';

export const unsavedChangesGuard: CanDeactivateFn<AddRecipePgComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate();
};
