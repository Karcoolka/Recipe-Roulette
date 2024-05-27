import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.modal";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Icebox Cake',
      'No oven, no problem.',
      'https://hips.hearstapps.com/hmg-prod/images/del049924-blueberry-cheesecake-icebox-cake-web-217-rv-lead-66393c6454c07.jpg?crop=1.00xw:0.502xh;0,0.189xh&resize=1200:*',
      [
        new Ingredient('Graham Crackers', 16),
        new Ingredient('Heavy Cream', 2),
        new Ingredient('Powdered Sugar', 1),
      ]),
    new Recipe(
      'Super Salad',
      'Potato salad is just the beginning.',
      'https://hips.hearstapps.com/hmg-prod/images/blackberry-peach-salad-vertical-662ad5484c91e.jpg?crop=0.819xw:0.328xh;0.0881xw,0.395xh&resize=1200:*',
      [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 3),
        new Ingredient('Lemon juice', 1),
      ]),
  ];

  constructor(
    private slService: ShoppingListService
  ) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsMethod(ingredients);
  }

}
