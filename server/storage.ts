import { type User, type InsertUser, type ChatMessage, type InsertChatMessage, type MealPlan, type InsertMealPlan, type FoodItem, type InsertFoodItem, type CalorieEntry, type InsertCalorieEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Chat operations
  getChatMessages(userId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Meal plan operations
  getMealPlans(userId: string): Promise<MealPlan[]>;
  createMealPlan(mealPlan: InsertMealPlan): Promise<MealPlan>;
  getMealPlan(id: string): Promise<MealPlan | undefined>;
  deleteMealPlan(id: string): Promise<boolean>;
  
  // Food item operations
  getFoodItems(): Promise<FoodItem[]>;
  searchFoodItems(query: string): Promise<FoodItem[]>;
  createFoodItem(foodItem: InsertFoodItem): Promise<FoodItem>;
  getFoodItem(id: string): Promise<FoodItem | undefined>;
  
  // Calorie tracking operations
  getCalorieEntries(userId: string, date?: Date): Promise<CalorieEntry[]>;
  createCalorieEntry(entry: InsertCalorieEntry): Promise<CalorieEntry>;
  deleteCalorieEntry(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: Map<string, ChatMessage>;
  private mealPlans: Map<string, MealPlan>;
  private foodItems: Map<string, FoodItem>;
  private calorieEntries: Map<string, CalorieEntry>;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.mealPlans = new Map();
    this.foodItems = new Map();
    this.calorieEntries = new Map();
    
    // Initialize with common food items
    this.initializeFoodDatabase();
  }

  private initializeFoodDatabase() {
    const commonFoods: InsertFoodItem[] = [
      { name: "Apple, medium", caloriesPerServing: 95, servingSize: "1 medium (182g)", protein: "0.5", carbs: "25", fat: "0.3", category: "fruits" },
      { name: "Banana, medium", caloriesPerServing: 105, servingSize: "1 medium (118g)", protein: "1.3", carbs: "27", fat: "0.4", category: "fruits" },
      { name: "Chicken Breast", caloriesPerServing: 165, servingSize: "100g grilled", protein: "31", carbs: "0", fat: "3.6", category: "protein" },
      { name: "Quinoa, cooked", caloriesPerServing: 222, servingSize: "1 cup (185g)", protein: "8", carbs: "39", fat: "3.6", category: "grains" },
      { name: "Greek Yogurt", caloriesPerServing: 130, servingSize: "1 cup (245g)", protein: "23", carbs: "9", fat: "0.4", category: "dairy" },
      { name: "Salmon, grilled", caloriesPerServing: 206, servingSize: "100g", protein: "22", carbs: "0", fat: "12", category: "protein" },
      { name: "Brown Rice, cooked", caloriesPerServing: 216, servingSize: "1 cup (195g)", protein: "5", carbs: "45", fat: "1.8", category: "grains" },
      { name: "Broccoli, steamed", caloriesPerServing: 27, servingSize: "1 cup (156g)", protein: "3", carbs: "6", fat: "0.4", category: "vegetables" },
      { name: "Avocado", caloriesPerServing: 234, servingSize: "1 medium (150g)", protein: "3", carbs: "12", fat: "21", category: "fruits" },
      { name: "Oats, cooked", caloriesPerServing: 158, servingSize: "1 cup (234g)", protein: "6", carbs: "28", fat: "3.2", category: "grains" },
    ];

    commonFoods.forEach(food => {
      const id = randomUUID();
      this.foodItems.set(id, { 
        ...food, 
        id,
        protein: food.protein || null,
        carbs: food.carbs || null,
        fat: food.fat || null,
        category: food.category || null,
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      dietaryPreferences: insertUser.dietaryPreferences || [],
      weight: insertUser.weight || null,
      height: insertUser.height || null,
      age: insertUser.age || null,
      activityLevel: insertUser.activityLevel || null,
      fitnessGoal: insertUser.fitnessGoal || null,
      calorieGoal: insertUser.calorieGoal || null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getChatMessages(userId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      userId: insertMessage.userId || null,
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getMealPlans(userId: string): Promise<MealPlan[]> {
    return Array.from(this.mealPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createMealPlan(insertMealPlan: InsertMealPlan): Promise<MealPlan> {
    const id = randomUUID();
    const mealPlan: MealPlan = {
      ...insertMealPlan,
      id,
      createdAt: new Date(),
      userId: insertMealPlan.userId || null,
      totalCalories: insertMealPlan.totalCalories || null,
      targetDate: insertMealPlan.targetDate || null,
    };
    this.mealPlans.set(id, mealPlan);
    return mealPlan;
  }

  async getMealPlan(id: string): Promise<MealPlan | undefined> {
    return this.mealPlans.get(id);
  }

  async deleteMealPlan(id: string): Promise<boolean> {
    return this.mealPlans.delete(id);
  }

  async getFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async searchFoodItems(query: string): Promise<FoodItem[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.foodItems.values())
      .filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category?.toLowerCase().includes(lowerQuery)
      );
  }

  async createFoodItem(insertFoodItem: InsertFoodItem): Promise<FoodItem> {
    const id = randomUUID();
    const foodItem: FoodItem = {
      ...insertFoodItem,
      id,
      protein: insertFoodItem.protein || null,
      carbs: insertFoodItem.carbs || null,
      fat: insertFoodItem.fat || null,
      category: insertFoodItem.category || null,
    };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  async getFoodItem(id: string): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async getCalorieEntries(userId: string, date?: Date): Promise<CalorieEntry[]> {
    const entries = Array.from(this.calorieEntries.values())
      .filter(entry => entry.userId === userId);
    
    if (date) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
      const nextDate = new Date(targetDate);
      nextDate.setDate(nextDate.getDate() + 1);
      
      return entries.filter(entry => {
        const entryDate = entry.timestamp || new Date();
        return entryDate >= targetDate && entryDate < nextDate;
      });
    }
    
    return entries.sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0));
  }

  async createCalorieEntry(insertEntry: InsertCalorieEntry): Promise<CalorieEntry> {
    const id = randomUUID();
    const entry: CalorieEntry = {
      ...insertEntry,
      id,
      timestamp: new Date(),
      userId: insertEntry.userId || null,
      foodItemId: insertEntry.foodItemId || null,
      servings: insertEntry.servings || null,
      mealType: insertEntry.mealType || null,
    };
    this.calorieEntries.set(id, entry);
    return entry;
  }

  async deleteCalorieEntry(id: string): Promise<boolean> {
    return this.calorieEntries.delete(id);
  }
}

export const storage = new MemStorage();
