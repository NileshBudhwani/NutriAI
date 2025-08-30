import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Bot, Brain, Target, TrendingUp, Zap, Activity } from "lucide-react";

const agents = [
  {
    id: "nutrition-coach",
    name: "Nutrition Coach Agent",
    description: "Your personal AI nutrition coach that learns your preferences and automatically adjusts meal plans based on your progress.",
    icon: Bot,
    color: "bg-green-500",
    features: ["Adaptive meal planning", "Progress tracking", "Preference learning", "Goal optimization"],
    status: "active",
    progress: 85
  },
  {
    id: "health-assessor", 
    name: "Health Assessment Agent",
    description: "Continuous health monitoring agent that analyzes your nutrition data and provides personalized health insights.",
    icon: Activity,
    color: "bg-blue-500", 
    features: ["Health pattern analysis", "Risk assessment", "Preventive recommendations", "Biomarker tracking"],
    status: "learning",
    progress: 67
  },
  {
    id: "goal-optimizer",
    name: "Goal Optimization Agent", 
    description: "Intelligent goal-setting agent that automatically adjusts your fitness and nutrition targets based on real-world results.",
    icon: Target,
    color: "bg-purple-500",
    features: ["Dynamic goal adjustment", "Success prediction", "Timeline optimization", "Motivation enhancement"],
    status: "active",
    progress: 92
  },
  {
    id: "trend-analyzer",
    name: "Trend Analysis Agent",
    description: "Advanced analytics agent that identifies patterns in your nutrition habits and predicts future health outcomes.",
    icon: TrendingUp, 
    color: "bg-orange-500",
    features: ["Habit pattern recognition", "Predictive analytics", "Trend visualization", "Behavior insights"],
    status: "analyzing",
    progress: 74
  }
];

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Hero Section */}
      <ScrollAnimation className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Agentic AI Powered
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Meet Your AI Agents
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our autonomous AI agents work 24/7 to optimize your nutrition, analyze your health patterns, 
            and continuously improve your wellness journey without any manual intervention.
          </p>
        </div>
      </ScrollAnimation>

      {/* Agents Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {agents.map((agent, index) => (
            <ScrollAnimation 
              key={agent.id}
              className="stagger-animation"
              delay={index * 100}
            >
              <Card 
                className={`agent-card cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                  selectedAgent === agent.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${agent.color} p-3 rounded-lg text-white`}>
                        <agent.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{agent.name}</CardTitle>
                        <Badge variant={
                          agent.status === 'active' ? 'default' : 
                          agent.status === 'learning' ? 'secondary' : 'outline'
                        }>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                    <Brain className="h-5 w-5 text-muted-foreground animate-pulse" />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {agent.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Agent Performance</span>
                        <span className="font-medium">{agent.progress}%</span>
                      </div>
                      <Progress value={agent.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {agent.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    {selectedAgent === agent.id && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-in slide-in-from-top-2">
                        <h4 className="font-semibold mb-3">Agent Actions</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="justify-start">
                            <Activity className="h-4 w-4 mr-2" />
                            View Analytics
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            <Target className="h-4 w-4 mr-2" />
                            Adjust Goals
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Agent Intelligence Showcase */}
      <ScrollAnimation className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Autonomous Intelligence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our agents use advanced machine learning to make intelligent decisions and continuously improve their recommendations.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="tech-showcase">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Continuous Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Agents learn from every interaction, adapting their strategies based on your unique patterns and preferences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="tech-showcase">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Real-time Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dynamic adjustment of recommendations based on real-time data and changing health conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="tech-showcase">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced forecasting to predict health outcomes and prevent issues before they occur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}