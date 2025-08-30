import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Link } from "wouter";
import { Bot, Calendar, Calculator, Dumbbell, Users, Brain, Database, Smartphone, Shield, Zap, Activity, Target, TrendingUp, Eye } from "lucide-react";
import chatScreenshot from "@assets/generated_images/AI_chatbot_interface_screenshot_bdcd47d4.png";
import mealPlanScreenshot from "@assets/generated_images/Meal_planning_interface_screenshot_fa4b8aea.png";
import calorieScreenshot from "@assets/generated_images/Calorie_tracking_dashboard_screenshot_925c0a34.png";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 hero-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animationType="fadeInLeft">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                Powered by Agentic AI
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="hero-title">
                Your Autonomous AI Nutrition & Fitness Companion
              </h1>
              <p className="text-xl mb-8 opacity-90" data-testid="hero-description">
                Experience the future of personalized nutrition with autonomous AI agents that continuously learn, adapt, and optimize your health journey without manual intervention.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-start-chat">
                  <Link href="/chat">
                    <Bot className="mr-2 h-5 w-5" />
                    Start Chat
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm" data-testid="button-plan-meals">
                  <Link href="/meal-planner">
                    <Calendar className="mr-2 h-5 w-5" />
                    Plan Meals
                  </Link>
                </Button>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animationType="fadeInRight" delay={200}>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Healthy colorful food bowl" 
                  className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                  data-testid="img-hero-food"
                />
                <div className="mt-6 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <Brain className="h-6 w-6 mx-auto mb-2 text-white" />
                    <div className="text-sm font-medium text-white">4 AI Agents</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-white" />
                    <div className="text-sm font-medium text-white">24/7 Monitoring</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Agentic AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              Autonomous Intelligence
            </div>
            <h2 className="text-4xl font-bold mb-4" data-testid="text-features-title">Meet Your AI Agents</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto" data-testid="text-features-subtitle">
              Our autonomous AI agents work independently to analyze, learn, and optimize your nutrition journey. 
              No manual input required – they continuously evolve with your needs.
            </p>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollAnimation className="stagger-animation" delay={100}>
              <Card className="agent-card text-center p-6" data-testid="card-feature-nutrition-coach">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-lg mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <Bot className="h-8 w-8" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1">
                      Active
                    </Badge>
                  </div>
                  <h5 className="font-semibold mb-2">Nutrition Coach Agent</h5>
                  <p className="text-muted-foreground text-sm">
                    Autonomous AI that learns your preferences and continuously optimizes meal recommendations
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
            
            <ScrollAnimation className="stagger-animation" delay={200}>
              <Card className="agent-card text-center p-6" data-testid="card-feature-health-assessor">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <Activity className="h-8 w-8" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1">
                      Learning
                    </Badge>
                  </div>
                  <h5 className="font-semibold mb-2">Health Assessment Agent</h5>
                  <p className="text-muted-foreground text-sm">
                    Continuously monitors your health patterns and provides predictive insights
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
            
            <ScrollAnimation className="stagger-animation" delay={300}>
              <Card className="agent-card text-center p-6" data-testid="card-feature-goal-optimizer">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-4 rounded-lg mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <Target className="h-8 w-8" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1">
                      Active
                    </Badge>
                  </div>
                  <h5 className="font-semibold mb-2">Goal Optimization Agent</h5>
                  <p className="text-muted-foreground text-sm">
                    Dynamically adjusts your fitness goals based on real-world performance data
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
            
            <ScrollAnimation className="stagger-animation" delay={400}>
              <Card className="agent-card text-center p-6" data-testid="card-feature-trend-analyzer">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-4 rounded-lg mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1">
                      Analyzing
                    </Badge>
                  </div>
                  <h5 className="font-semibold mb-2">Trend Analysis Agent</h5>
                  <p className="text-muted-foreground text-sm">
                    Advanced analytics that predict future health outcomes and prevent issues
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
          
          <ScrollAnimation className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/agents">
                <Brain className="mr-2 h-5 w-5" />
                Explore All Agents
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Technology Showcase Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Eye className="h-4 w-4" />
              See It In Action
            </div>
            <h2 className="text-4xl font-bold mb-4">Experience Our Technology</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take a look at our cutting-edge interface and see how our agentic AI transforms nutrition planning
            </p>
          </ScrollAnimation>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <ScrollAnimation className="stagger-animation" delay={100}>
              <Card className="tech-showcase overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={chatScreenshot} 
                    alt="AI Chatbot Interface" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Intelligent AI Chatbot</h3>
                  <p className="text-muted-foreground text-sm">
                    Conversational AI that understands context and provides personalized nutrition advice in real-time
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
            
            <ScrollAnimation className="stagger-animation" delay={200}>
              <Card className="tech-showcase overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={mealPlanScreenshot} 
                    alt="Meal Planning Interface" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Smart Meal Planning</h3>
                  <p className="text-muted-foreground text-sm">
                    AI agents automatically generate weekly meal plans that adapt to your preferences and dietary goals
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
            
            <ScrollAnimation className="stagger-animation" delay={300}>
              <Card className="tech-showcase overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={calorieScreenshot} 
                    alt="Calorie Tracking Dashboard" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive tracking with predictive analytics that help you achieve your health goals faster
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
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
