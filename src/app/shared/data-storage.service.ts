// import {Injectable} from "@angular/core";
// import {HttpClient, HttpParams} from "@angular/common/http";
// import {Recipe} from "../recipes/recipe.model";
// import {RecipeService} from "../recipes/recipe.service";
// import {exhaustMap, map, take, tap} from "rxjs/operators";
// import {AuthService} from "../auth/auth.service";
//
// @Injectable({providedIn: 'root'})
// export class DataStorageService {
//   constructor(private http: HttpClient,
//               private recipeService: RecipeService,
//               private authService: AuthService) {}
//
//     storeRecipes() {
//     const recipes = this.recipeService.getRecipes();
//     this.http.post('https://recipe-roulette-7cc86-default-rtdb.firebaseio.com/recipes.json', recipes)
//       .subscribe(response => {
//         console.log(response);
//       }
//     );
//     }
//
//     // fetchRecipes() {
//     //   return this.http.get<Recipe[]>(
//     //       'https://recipe-roulette-7cc86-default-rtdb.firebaseio.com/recipes.json',
//     //     ).pipe(
//     //  map(recipes => {
//     //  return recipes.map(recipe => {
//     //       return {
//     //         ...recipe,
//     //         ingredients: recipe.ingredients ? recipe.ingredients : []
//     //       };
//     //     });
//     //     }),
//     //     tap(recipes => {
//     //     this.recipeService.setRecipes(recipes);
//     //     })
//     //   );
//     // }
//
//     fetchRecipes() {
//         return this.authService.user.pipe(
//             take(1), //one time only
//             exhaustMap(user => {
//                 return this.http.get<{ [key: string]: Recipe }>(
//                     'https://recipe-roulette-7cc86-default-rtdb.firebaseio.com/recipes.json',
//                     {
//                         params: new HttpParams().set('auth', user.token)
//                     }
//                 );
//             }),
//             map(responseData => {
//                 const recipesArray: Recipe[] = [];
//                 for (const key in responseData) {
//                     if (responseData.hasOwnProperty(key)) {
//                         recipesArray.push({ ...responseData[key] });
//                     }
//                 }
//                 return recipesArray;
//             }),
//             map(recipes => {
//                 return recipes.map(recipe => {
//                     return {
//                         ...recipe,
//                         ingredients: recipe.ingredients ? recipe.ingredients : []
//                     };
//                 });
//             }),
//             tap(recipes => {
//                 this.recipeService.setRecipes(recipes);
//             })
//         );
//     }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://recipe-roulette-7cc86-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://recipe-roulette-7cc86-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
}
