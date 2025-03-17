import {Component, OnDestroy, OnInit} from '@angular/core'
import {RecipeService} from "../recipes/recipes.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed: boolean = true
  private userSub: Subscription
  isAuthenticated: boolean = false

  constructor(private recipesService: RecipeService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }
  onSaveData() {
    this.recipesService.storeRecipes()
  }

  onFetchData() {
    this.recipesService.fetchRecipes().subscribe()
  }

  onLogout() {
    this.authService.logout().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
