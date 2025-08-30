import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h5 className="font-bold text-xl text-primary flex items-center gap-2" data-testid="text-footer-brand">
              <Leaf className="h-6 w-6" />
              NutriAI
            </h5>
            <p className="text-gray-300 text-sm" data-testid="text-footer-description">
              Your AI-powered companion for better nutrition and fitness. Making healthy living accessible and personalized for everyone.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" data-testid="link-linkedin">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div>
            <h6 className="font-semibold mb-4" data-testid="text-features-heading">Features</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/chat" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-chat">
                  AI Chat
                </Link>
              </li>
              <li>
                <Link href="/meal-planner" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-meal-plans">
                  Meal Plans
                </Link>
              </li>
              <li>
                <Link href="/calorie-tracker" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-calorie-tracker">
                  Calorie Tracker
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Fitness Tips</span>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h6 className="font-semibold mb-4" data-testid="text-company-heading">Company</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-about">
                  About
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Privacy</span>
              </li>
              <li>
                <span className="text-gray-300">Terms</span>
              </li>
              <li>
                <span className="text-gray-300">Contact</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h6 className="font-semibold mb-4" data-testid="text-newsletter-heading">Stay Updated</h6>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest nutrition tips and AI insights delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0" data-testid="text-copyright">
            © 2024 NutriAI. Built for Hackathon. All rights reserved.
          </p>
          <small className="text-gray-500" data-testid="text-powered-by">
            Powered by Groq AI Technology
          </small>
        </div>
      </div>
    </footer>
  );
}
