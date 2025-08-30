import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import MealCard from "@/components/meal-planner/meal-card";
import { Wand2, Download, RefreshCw } from "lucide-react";
import type { MealPlan } from "@shared/schema";

// Mock user ID for demo
const MOCK_USER_ID = "user-123";

interface MealPlanFormData {
  calorieGoal: number;
  dietaryPreferences: string[];
  fitnessGoal: string;
}

export default function MealPlanner() {
  const [formData, setFormData] = useState<MealPlanFormData>({
    calorieGoal: 1500,
    dietaryPreferences: [],
    fitnessGoal: "weight_loss",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: mealPlans = [], isLoading } = useQuery<MealPlan[]>({
    queryKey: ["/api/meal-plans", MOCK_USER_ID],
    enabled: !!MOCK_USER_ID,
  });

  const generateMealPlanMutation = useMutation({
    mutationFn: async (data: MealPlanFormData) => {
      const response = await apiRequest("POST", "/api/meal-plans/generate", {
        userId: MOCK_USER_ID,
        ...data,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meal-plans", MOCK_USER_ID] });
      toast({
        title: "Success!",
        description: "Your meal plan has been generated successfully.",
      });
    },
    onError: (error) => {
      console.error("Failed to generate meal plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDietaryPreferenceChange = (preference: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: checked
        ? [...prev.dietaryPreferences, preference]
        : prev.dietaryPreferences.filter(p => p !== preference)
    }));
  };

  const handleGeneratePlan = () => {
    generateMealPlanMutation.mutate(formData);
  };

  const currentMealPlan = mealPlans[0] as MealPlan | undefined;
  const weeklyMeals = currentMealPlan?.meals as any[] || [];

  // Calculate daily stats for demo
  const todaysCalories = 1247;
  const todaysProtein = 85;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Meal Plan Generator */}
        <div className="space-y-6">
          <Card data-testid="card-meal-plan-generator">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Meal Plan Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Daily Calorie Goal</label>
                  <Select 
                    value={formData.calorieGoal.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, calorieGoal: parseInt(value) }))}
                  >
                    <SelectTrigger data-testid="select-calorie-goal">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1200">1200 calories</SelectItem>
                      <SelectItem value="1500">1500 calories</SelectItem>
                      <SelectItem value="1800">1800 calories</SelectItem>
                      <SelectItem value="2000">2000 calories</SelectItem>
                      <SelectItem value="2500">2500 calories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Dietary Preferences</label>
                  <div className="space-y-2">
                    {[
                      { id: "vegetarian", label: "Vegetarian" },
                      { id: "vegan", label: "Vegan" },
                      { id: "gluten_free", label: "Gluten-Free" },
                      { id: "keto", label: "Keto" },
                    ].map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.dietaryPreferences.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleDietaryPreferenceChange(option.id, checked as boolean)
                          }
                          data-testid={`checkbox-${option.id}`}
                        />
                        <label htmlFor={option.id} className="text-sm cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Fitness Goal</label>
                  <Select 
                    value={formData.fitnessGoal} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessGoal: value }))}
                  >
                    <SelectTrigger data-testid="select-fitness-goal">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleGeneratePlan}
                  disabled={generateMealPlanMutation.isPending}
                  className="w-full"
                  data-testid="button-generate-meal-plan"
                >
                  {generateMealPlanMutation.isPending ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate Meal Plan
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Stats */}
          <Card data-testid="card-daily-overview">
            <CardContent className="p-6">
              <h6 className="font-semibold mb-3">Today's Overview</h6>
              <div className="grid grid-cols-2 gap-4">
                <div className="nutrition-stat rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1" data-testid="text-calories-consumed">
                    {todaysCalories}
                  </div>
                  <small className="text-muted-foreground">Calories</small>
                </div>
                <div className="nutrition-stat rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-secondary mb-1" data-testid="text-protein-consumed">
                    {todaysProtein}g
                  </div>
                  <small className="text-muted-foreground">Protein</small>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Weekly Meal Plan */}
        <div className="lg:col-span-2">
          <Card data-testid="card-weekly-meal-plan">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Your Weekly Meal Plan</CardTitle>
                <Button variant="outline" size="sm" data-testid="button-export-meal-plan">
                  <Download className="mr-1 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading && (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              
              {!isLoading && weeklyMeals.length === 0 && (
                <div className="text-center py-12">
                  <Wand2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2" data-testid="text-no-meal-plan">No Meal Plan Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate your first AI-powered meal plan to get started!
                  </p>
                  <Button onClick={handleGeneratePlan} disabled={generateMealPlanMutation.isPending}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Meal Plan
                  </Button>
                </div>
              )}
              
              {weeklyMeals.length > 0 && (
                <div className="space-y-6">
                  {weeklyMeals.map((day: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4" data-testid={`day-meal-plan-${index}`}>
                      <h6 className="font-semibold text-primary mb-4" data-testid={`text-day-name-${index}`}>
                        {day.day || `Day ${index + 1}`}
                      </h6>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <MealCard
                          title="Breakfast"
                          icon="🌅"
                          meal={day.meals?.breakfast}
                          imageUrl="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                        />
                        <MealCard
                          title="Lunch"
                          icon="☀️"
                          meal={day.meals?.lunch}
                          imageUrl="https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                        />
                        <MealCard
                          title="Dinner"
                          icon="🌙"
                          meal={day.meals?.dinner}
                          imageUrl="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                        />
                      </div>
                      
                      <div className="text-right mt-4">
                        <small className="text-primary font-semibold" data-testid={`text-day-total-calories-${index}`}>
                          Total: {day.totalCalories || 1250} calories
                        </small>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={handleGeneratePlan}
                      disabled={generateMealPlanMutation.isPending}
                      data-testid="button-regenerate-plan"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate Plan
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
