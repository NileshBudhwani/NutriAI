import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Plus, Loader2 } from "lucide-react";
import type { FoodItem as FoodItemType } from "@shared/schema";

interface FoodItemProps {
  foodItem: FoodItemType;
  onAdd: (foodItemId: string, servings: number) => void;
  isAdding: boolean;
}

export default function FoodItem({ foodItem, onAdd, isAdding }: FoodItemProps) {
  const [servings, setServings] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = () => {
    onAdd(foodItem.id!, servings);
    setIsExpanded(false);
    setServings(1);
  };

  const totalCalories = Math.round(foodItem.caloriesPerServing * servings);

  return (
    <Card className="food-item transition-colors hover:bg-muted/50" data-testid={`food-item-${foodItem.id}`}>
      <CardContent className="p-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
              <Apple className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium" data-testid={`text-food-name-${foodItem.id}`}>
                {foodItem.name}
              </div>
              <small className="text-muted-foreground" data-testid={`text-food-serving-${foodItem.id}`}>
                {foodItem.servingSize}
              </small>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold" data-testid={`text-food-calories-${foodItem.id}`}>
              {foodItem.caloriesPerServing} cal
            </div>
            <small className="text-muted-foreground">per serving</small>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t flex items-center gap-3">
            <label className="text-sm">Servings:</label>
            <Input
              type="number"
              min="0.1"
              step="0.1"
              value={servings}
              onChange={(e) => setServings(parseFloat(e.target.value) || 1)}
              className="w-20"
              data-testid={`input-servings-${foodItem.id}`}
            />
            <div className="text-sm text-muted-foreground">
              = {totalCalories} cal
            </div>
            <Button 
              size="sm" 
              onClick={handleAdd}
              disabled={isAdding}
              className="ml-auto"
              data-testid={`button-add-food-${foodItem.id}`}
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <Plus className="h-4 w-4 mr-1" />
              )}
              Add
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
