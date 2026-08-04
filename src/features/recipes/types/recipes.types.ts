export interface Ingredient {
    name: string
    quantity: string // contoh: "2 buah", "500 gram" — disimpan sebagai string tampilan

}

export type RecipeCategory =
  | 'main-course'
  | 'side-dish'
  | 'soup'
  | 'dessert'
  | 'beverage'

export interface Recipe {
    id: string
    title: string
    description: string
    imageUrl: string
    ingredients : Ingredient[]
    steps: string[]
    cookingTimeMinutes:number
    servings:number
    category:RecipeCategory

}

/**
 * Query pencarian — dipisah dari implementasi search itu sendiri.
 * `term` adalah raw string dari user, matching logic (title vs ingredient)
 * ditangani di service, bukan di type ini.
 */
export interface RecipeSearchQuery{
    term:string
}

export interface SavedRecipe{
    recipeID: string
    savedAt: string   // ISO date string

}