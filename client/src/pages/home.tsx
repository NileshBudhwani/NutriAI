import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Bot, Calendar, Calculator, Dumbbell, Users, Brain, Database, Smartphone, Shield } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 hero-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="hero-title">
                Your AI-Powered Nutrition & Fitness Companion
              </h1>
              <p className="text-xl mb-8 opacity-90" data-testid="hero-description">
                Get personalized meal plans, track calories, and receive expert nutrition advice powered by advanced AI technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-start-chat">
                  <Link href="/chat">
                    <Bot className="mr-2 h-5 w-5" />
                    Start Chat
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-plan-meals">
                  <Link href="/meal-planner">
                    <Calendar className="mr-2 h-5 w-5" />
                    Plan Meals
                  </Link>
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Healthy colorful food bowl" 
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                data-testid="img-hero-food"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-features-title">Powered by Advanced AI</h2>
            <p className="text-muted-foreground text-lg" data-testid="text-features-subtitle">
              Discover how NutriAI can transform your health journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="feature-card text-center p-6" data-testid="card-feature-chatbot">
              <CardContent className="p-0">
                <div className="text-primary mb-4">
                  <Bot className="h-12 w-12 mx-auto" />
                </div>
                <h5 className="font-semibold mb-2">AI Chatbot</h5>
                <p className="text-muted-foreground text-sm">
                  Get instant nutrition advice and answers to your health questions
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card text-center p-6" data-testid="card-feature-meal-planning">
              <CardContent className="p-0">
                <div className="text-secondary mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <h5 className="font-semibold mb-2">Meal Planning</h5>
                <p className="text-muted-foreground text-sm">
                  Generate personalized weekly meal plans based on your goals
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card text-center p-6" data-testid="card-feature-calorie-tracking">
              <CardContent className="p-0">
                <div className="text-accent mb-4">
                  <Calculator className="h-12 w-12 mx-auto" />
                </div>
                <h5 className="font-semibold mb-2">Calorie Tracking</h5>
                <p className="text-muted-foreground text-sm">
                  Easily track your daily calorie intake with our smart calculator
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card text-center p-6" data-testid="card-feature-fitness-tips">
              <CardContent className="p-0">
                <div className="text-primary mb-4">
                  <Dumbbell className="h-12 w-12 mx-auto" />
                </div>
                <h5 className="font-semibold mb-2">Fitness Tips</h5>
                <p className="text-muted-foreground text-sm">
                  Receive personalized workout recommendations based on your BMI
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-how-it-works-title">How NutriAI Works</h2>
            <p className="text-muted-foreground text-lg" data-testid="text-how-it-works-subtitle">
              Simple steps to achieve your health goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="step-create-profile">
              <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h5 className="font-semibold mb-2">1. Create Profile</h5>
              <p className="text-muted-foreground">
                Tell us about your health goals, dietary preferences, and fitness level
              </p>
            </div>
            
            <div className="text-center" data-testid="step-ai-analysis">
              <div className="bg-secondary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h5 className="font-semibold mb-2">2. AI Analysis</h5>
              <p className="text-muted-foreground">
                Our AI analyzes your data to create personalized recommendations
              </p>
            </div>
            
            <div className="text-center" data-testid="step-track-progress">
              <div className="bg-accent text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8" />
              </div>
              <h5 className="font-semibold mb-2">3. Track Progress</h5>
              <p className="text-muted-foreground">
                Monitor your journey with detailed insights and continuous AI support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
