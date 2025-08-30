import { Card, CardContent } from "@/components/ui/card";
import { Brain, Database, Smartphone, Shield, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="text-about-title">
          About NutriAI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-about-subtitle">
          Revolutionizing nutrition and fitness with the power of artificial intelligence
        </p>
        <img 
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
          alt="People exercising in modern gym" 
          className="rounded-2xl shadow-lg w-full max-w-4xl mx-auto"
          data-testid="img-about-hero"
        />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Mission */}
        <Card className="h-full" data-testid="card-mission">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-secondary mb-6">Our Mission</h3>
            <p className="mb-4 text-muted-foreground">
              NutriAI was created to democratize access to personalized nutrition and fitness guidance. 
              We believe everyone deserves expert-level advice tailored to their unique needs and goals.
            </p>
            <p className="mb-6 text-muted-foreground">
              Using cutting-edge AI technology, we provide instant, accurate, and personalized recommendations 
              that adapt to your lifestyle, preferences, and health objectives.
            </p>
            
            <h5 className="font-semibold text-primary mb-4">Key Features:</h5>
            <ul className="space-y-3">
              {[
                "AI-powered nutrition chatbot",
                "Personalized meal planning",
                "Intelligent calorie tracking", 
                "Custom fitness recommendations",
                "Continuous learning and adaptation"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3" data-testid={`feature-item-${index}`}>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Technology */}
        <Card className="h-full" data-testid="card-technology">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-accent mb-6">The Technology</h3>
            <p className="mb-6 text-muted-foreground">
              NutriAI leverages the powerful Groq API with the mixtral-8x7b-32768 model to deliver 
              lightning-fast, contextually aware responses to all your nutrition and fitness questions.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: Brain, title: "Advanced AI", subtitle: "Groq-powered intelligence", color: "text-primary" },
                { icon: Database, title: "Rich Database", subtitle: "Comprehensive food data", color: "text-secondary" },
                { icon: Smartphone, title: "Mobile Ready", subtitle: "Responsive design", color: "text-accent" },
                { icon: Shield, title: "Secure", subtitle: "Privacy-focused", color: "text-green-500" },
              ].map((item, index) => (
                <div key={index} className="bg-muted rounded-lg p-4 text-center" data-testid={`tech-feature-${index}`}>
                  <item.icon className={`h-8 w-8 mx-auto mb-2 ${item.color}`} />
                  <h6 className="font-semibold text-sm">{item.title}</h6>
                  <small className="text-muted-foreground">{item.subtitle}</small>
                </div>
              ))}
            </div>
            
            <h5 className="font-semibold text-primary mb-3">Built For Hackathon:</h5>
            <p className="text-muted-foreground">
              This project was developed as a complete, production-ready solution showcasing the potential 
              of AI in personal health technology. Our clean, scalable architecture makes it easy to extend and customize.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tech Stack */}
      <Card data-testid="card-tech-stack">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Built with ❤️ for Hackathon</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Demonstrating the power of AI in personal health technology
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "⚛️", title: "React", subtitle: "Frontend Framework", color: "text-primary" },
              { icon: "🟢", title: "Node.js", subtitle: "Backend Runtime", color: "text-secondary" },
              { icon: "🗄️", title: "PostgreSQL", subtitle: "Database", color: "text-accent" },
              { icon: "⚡", title: "Groq API", subtitle: "AI Engine", color: "text-green-500" },
            ].map((tech, index) => (
              <div key={index} className="text-center" data-testid={`tech-stack-${index}`}>
                <div className="text-4xl mb-2">{tech.icon}</div>
                <h6 className="font-semibold">{tech.title}</h6>
                <small className="text-muted-foreground">{tech.subtitle}</small>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
