import { Card, CardContent } from "@/components/ui/card";

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
