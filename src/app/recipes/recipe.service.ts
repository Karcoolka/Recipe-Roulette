import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.logolynx.com/images/logolynx/82/829ba7822e43ebe89394d1ecbbf152b7.jpeg'),
    new Recipe('A Test Recipe 22222', 'This is simply a test', 'https://www.logolynx.com/images/logolynx/82/829ba7822e43ebe89394d1ecbbf152b7.jpeg'),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

}
