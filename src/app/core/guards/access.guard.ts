import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const accessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('userId') !== '1') {
    alert('only admin can access this page');
    router.navigate(['/']);
    return false;
  }
  return true;
};
