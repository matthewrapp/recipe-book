import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test.',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yMIHkxs901EzRfpvMq6gIEfDADZcfbJxLw&usqp=CAU',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe('A Test Recipe',
            'This is simply a test.',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlaxE2hcmTVZ6kb0quZ1gX8YuUuekl31caA&usqp=CAU',
            [
                new Ingredient('Chicken', 2),
                new Ingredient('Potato Chips', 4)
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChange.next(this.recipes.slice());
    }
}