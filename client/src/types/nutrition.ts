export interface MacroNutrients {
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface NutritionFacts extends MacroNutrients {
  calories: number;
  sodium?: number;
  sugar?: number;
  cholesterol?: number;
}

export interface MealInfo {
  id: string;
  name: string;
  description?: string;
  calories: number;
  nutrition: NutritionFacts;
  imageUrl?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients?: string[];
  instructions?: string[];
}

export interface DailyMealPlan {
  date: string;
  breakfast: MealInfo;
  lunch: MealInfo;
  dinner: MealInfo;
  snacks: MealInfo[];
  totalCalories: number;
  totalNutrition: NutritionFacts;
}

export interface WeeklyMealPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  days: DailyMealPlan[];
  weeklyTotals: NutritionFacts;
}

export interface UserProfile {
  id: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  sex: "male" | "female";
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  fitnessGoal: "weight_loss" | "muscle_gain" | "maintenance" | "endurance";
  dietaryRestrictions: string[];
  allergies: string[];
  calorieGoal: number;
  macroTargets: MacroNutrients;
}

export interface CalorieEntry {
  id: string;
  userId: string;
  foodItemId: string;
  foodName: string;
  servings: number;
  calories: number;
  nutrition: NutritionFacts;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  timestamp: Date;
}

export interface FitnessRecommendation {
  bmi: number;
  bmiCategory: "underweight" | "normal" | "overweight" | "obese";
  recommendedCalories: number;
  recommendedMacros: MacroNutrients;
  workoutRecommendations: string[];
  nutritionTips: string[];
}
