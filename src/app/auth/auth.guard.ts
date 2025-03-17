import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.user
    .pipe(
      take(1),
      map(user => {
        const isAuth: boolean = !!user
        if (isAuth) { return true; }
        return router.createUrlTree(['/auth']);
      })
    );
};
