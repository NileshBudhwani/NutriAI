import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import FoodItem from "@/components/calorie-tracker/food-item";
import { Search, PieChart } from "lucide-react";
import type { FoodItem as FoodItemType, CalorieEntry } from "@shared/schema";

// Mock user ID for demo
const MOCK_USER_ID = "user-123";

export default function CalorieTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: foodItems = [], isLoading: foodLoading } = useQuery({
    queryKey: ["/api/food-items"],
    queryFn: async () => {
      const response = await fetch("/api/food-items");
      return response.json();
    },
  });

  const { data: calorieEntries = [], isLoading: entriesLoading } = useQuery<CalorieEntry[]>({
    queryKey: ["/api/calorie-entries", MOCK_USER_ID],
    enabled: !!MOCK_USER_ID,
  });

  const addFoodMutation = useMutation({
    mutationFn: async ({ foodItemId, servings = 1, mealType = "snack" }: {
      foodItemId: string;
      servings?: number;
      mealType?: string;
    }) => {
      const response = await apiRequest("POST", "/api/calorie-entries", {
        userId: MOCK_USER_ID,
        foodItemId,
        servings,
        mealType,
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/calorie-entries", MOCK_USER_ID] });
      toast({
        title: "Food Added",
        description: `Added ${data.foodItem?.name} to your tracker!`,
      });
    },
    onError: (error) => {
      console.error("Failed to add food:", error);
      toast({
        title: "Error",
        description: "Failed to add food item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredFoodItems = foodItems.filter((item: FoodItemType) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate daily progress
  const totalCalories = calorieEntries.reduce((sum: number, entry: any) => 
    sum + (entry.totalCalories || 0), 0
  );
  const calorieGoal = 1500;
  const progressPercentage = Math.min((totalCalories / calorieGoal) * 100, 100);

  // Calculate macros (simplified calculation)
  const totalProtein = calorieEntries.reduce((sum: number, entry: any) => 
    sum + (parseFloat(entry.foodItem?.protein || "0") * parseFloat(entry.servings || "1")), 0
  );
  const totalCarbs = calorieEntries.reduce((sum: number, entry: any) => 
    sum + (parseFloat(entry.foodItem?.carbs || "0") * parseFloat(entry.servings || "1")), 0
  );
  const totalFat = calorieEntries.reduce((sum: number, entry: any) => 
    sum + (parseFloat(entry.foodItem?.fat || "0") * parseFloat(entry.servings || "1")), 0
  );

  const macroCalories = (totalProtein * 4) + (totalCarbs * 4) + (totalFat * 9);
  const carbsPercentage = macroCalories > 0 ? (totalCarbs * 4 / macroCalories) * 100 : 0;
  const proteinPercentage = macroCalories > 0 ? (totalProtein * 4 / macroCalories) * 100 : 0;
  const fatPercentage = macroCalories > 0 ? (totalFat * 9 / macroCalories) * 100 : 0;

  const recentEntries = calorieEntries.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Food Logger */}
        <div className="lg:col-span-2">
          <Card data-testid="card-food-logger">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Food Logger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for food items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-food-search"
                  />
                </div>
              </div>
              
              <div>
                <h6 className="font-semibold mb-3">
                  {searchQuery ? "Search Results" : "Popular Foods"}
                </h6>
                
                {foodLoading && (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {filteredFoodItems.slice(0, 10).map((item: FoodItemType) => (
                    <FoodItem
                      key={item.id}
                      foodItem={item}
                      onAdd={(foodItemId, servings) => 
                        addFoodMutation.mutate({ foodItemId, servings })
                      }
                      isAdding={addFoodMutation.isPending}
                    />
                  ))}
                </div>
                
                {filteredFoodItems.length === 0 && !foodLoading && (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchQuery ? "No food items found." : "No food items available."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Daily Progress */}
          <Card data-testid="card-daily-progress">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-secondary" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {/* Circular Progress */}
              <div className="relative inline-block mb-6">
                <svg width="120" height="120" className="progress-ring">
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    stroke="hsl(var(--muted))" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray="314" 
                    strokeDashoffset={314 - (314 * progressPercentage / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-2xl font-bold" data-testid="text-calories-today">{totalCalories}</div>
                  <small className="text-muted-foreground">/ {calorieGoal} cal</small>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-primary font-semibold" data-testid="text-carbs-percentage">
                    {carbsPercentage.toFixed(0)}%
                  </div>
                  <small className="text-muted-foreground">Carbs</small>
                </div>
                <div>
                  <div className="text-secondary font-semibold" data-testid="text-protein-percentage">
                    {proteinPercentage.toFixed(0)}%
                  </div>
                  <small className="text-muted-foreground">Protein</small>
                </div>
                <div>
                  <div className="text-accent font-semibold" data-testid="text-fat-percentage">
                    {fatPercentage.toFixed(0)}%
                  </div>
                  <small className="text-muted-foreground">Fat</small>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Foods */}
          <Card data-testid="card-recent-foods">
            <CardHeader>
              <CardTitle className="text-lg">Recent Foods</CardTitle>
            </CardHeader>
            <CardContent>
              {entriesLoading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}
              
              <div className="space-y-3">
                {recentEntries.map((entry: any) => (
                  <div key={entry.id} className="flex justify-between items-center border-b pb-2" data-testid={`recent-food-${entry.id}`}>
                    <div>
                      <div className="font-medium text-sm">{entry.foodItem?.name || "Unknown Food"}</div>
                      <small className="text-muted-foreground">
                        {entry.mealType || "Snack"}, {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </small>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{entry.totalCalories || 0} cal</div>
                    </div>
                  </div>
                ))}
                
                {recentEntries.length === 0 && !entriesLoading && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No foods logged today. Start by searching and adding foods above!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
