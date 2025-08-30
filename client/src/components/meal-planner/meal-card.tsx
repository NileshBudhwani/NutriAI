import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MealCardProps {
  title: string;
  icon: string;
  meal?: {
    name: string;
    calories: number;
    description?: string;
  };
  imageUrl: string;
}

interface WeeklyMealTableProps {
  weeklyMeals: any[];
}

export function WeeklyMealTable({ weeklyMeals }: WeeklyMealTableProps) {
  return (
    <Card className="overflow-hidden" data-testid="weekly-meal-table">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-white hover:bg-primary">
              <TableHead className="text-white font-semibold">Day</TableHead>
              <TableHead className="text-white font-semibold">Breakfast</TableHead>
              <TableHead className="text-white font-semibold">Lunch</TableHead>
              <TableHead className="text-white font-semibold">Dinner</TableHead>
              <TableHead className="text-white font-semibold text-right">Total Calories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weeklyMeals.map((day: any, index: number) => (
              <TableRow key={index} className="hover:bg-muted/50" data-testid={`meal-row-${index}`}>
                <TableCell className="font-semibold text-primary" data-testid={`day-name-${index}`}>
                  {day.day || `Day ${index + 1}`}
                </TableCell>
                <TableCell data-testid={`breakfast-${index}`}>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">
                      {day.meals?.breakfast?.name || "Breakfast Meal"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {day.meals?.breakfast?.calories || 350} cal
                    </div>
                    {day.meals?.breakfast?.description && (
                      <div className="text-xs text-muted-foreground">
                        {day.meals?.breakfast?.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell data-testid={`lunch-${index}`}>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">
                      {day.meals?.lunch?.name || "Lunch Meal"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {day.meals?.lunch?.calories || 450} cal
                    </div>
                    {day.meals?.lunch?.description && (
                      <div className="text-xs text-muted-foreground">
                        {day.meals?.lunch?.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell data-testid={`dinner-${index}`}>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">
                      {day.meals?.dinner?.name || "Dinner Meal"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {day.meals?.dinner?.calories || 500} cal
                    </div>
                    {day.meals?.dinner?.description && (
                      <div className="text-xs text-muted-foreground">
                        {day.meals?.dinner?.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary" data-testid={`total-calories-${index}`}>
                  {day.totalCalories || 1300} cal
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function MealCard({ title, icon, meal, imageUrl }: MealCardProps) {
  return (
    <Card className="bg-muted" data-testid={`meal-card-${title.toLowerCase()}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{icon}</span>
          <h6 className="font-semibold" data-testid={`text-meal-title-${title.toLowerCase()}`}>{title}</h6>
        </div>
        
        <img 
          src={imageUrl}
          alt={meal?.name || `${title} meal`}
          className="w-full h-32 object-cover rounded-md mb-3"
          data-testid={`img-meal-${title.toLowerCase()}`}
        />
        
        <div>
          <p className="font-medium mb-1" data-testid={`text-meal-name-${title.toLowerCase()}`}>
            {meal?.name || `${title} Meal`}
          </p>
          <small className="text-muted-foreground" data-testid={`text-meal-calories-${title.toLowerCase()}`}>
            {meal?.calories || 350} calories
          </small>
          {meal?.description && (
            <p className="text-xs text-muted-foreground mt-2" data-testid={`text-meal-description-${title.toLowerCase()}`}>
              {meal.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
