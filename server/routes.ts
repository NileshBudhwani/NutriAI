import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertMealPlanSchema, insertCalorieEntrySchema } from "@shared/schema";
import { z } from "zod";

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || "";

async function callGroqAPI(messages: Array<{role: string, content: string}>) {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not found in environment variables");
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error details:", errorText);
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Groq API call failed:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoints
  app.get("/api/chat/messages/:userId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat/send", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createChatMessage(messageData);

      // Prepare conversation context for Groq API
      const recentMessages = await storage.getChatMessages(messageData.userId || "");
      const conversationHistory = recentMessages.slice(-10).map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.message
      }));

      // Add current message to context
      conversationHistory.push({
        role: "user",
        content: messageData.message
      });

      // Add system prompt for nutrition context
      const systemPrompt = {
        role: "system",
        content: `You are NutriAI, an expert nutrition and fitness assistant. You provide personalized advice on:
        - Meal planning and nutrition recommendations
        - Calorie counting and macro tracking
        - Diet plans for various goals (weight loss, muscle gain, etc.)
        - Exercise and fitness tips based on BMI and goals
        - Healthy eating habits and lifestyle changes
        
        Always provide evidence-based, practical advice. Be encouraging and supportive. If asked about medical conditions, recommend consulting healthcare professionals.`
      };

      const messages = [systemPrompt, ...conversationHistory];

      // Get AI response from Groq
      const aiResponse = await callGroqAPI(messages);

      // Save AI response
      const aiMessage = await storage.createChatMessage({
        userId: messageData.userId,
        message: aiResponse,
        isUser: false,
      });

      res.json({
        userMessage,
        aiMessage,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Meal planning endpoints
  app.get("/api/meal-plans/:userId", async (req, res) => {
    try {
      const mealPlans = await storage.getMealPlans(req.params.userId);
      res.json(mealPlans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meal plans" });
    }
  });

  app.post("/api/meal-plans/generate", async (req, res) => {
    try {
      const { userId, calorieGoal, dietaryPreferences, fitnessGoal } = req.body;

      // Generate meal plan using Groq API
      const prompt = `Create a detailed 7-day meal plan with the following requirements:
      - Daily calorie target: ${calorieGoal || 1500} calories
      - Dietary preferences: ${dietaryPreferences?.join(", ") || "none"}
      - Fitness goal: ${fitnessGoal || "maintenance"}
      
      Format the response as a JSON object with this structure:
      {
        "name": "Weekly Meal Plan",
        "days": [
          {
            "day": "Monday",
            "meals": {
              "breakfast": {"name": "Oatmeal with Berries", "calories": 350, "description": "Steel-cut oats with mixed berries and almonds"},
              "lunch": {"name": "Quinoa Power Bowl", "calories": 450, "description": "Quinoa with grilled chicken and roasted vegetables"},
              "dinner": {"name": "Grilled Salmon", "calories": 500, "description": "Grilled salmon with steamed broccoli and sweet potato"}
            },
            "totalCalories": 1300
          },
          {
            "day": "Tuesday",
            "meals": {
              "breakfast": {"name": "Greek Yogurt Parfait", "calories": 320, "description": "Greek yogurt with granola and fresh fruit"},
              "lunch": {"name": "Turkey Sandwich", "calories": 420, "description": "Whole grain turkey sandwich with avocado and vegetables"},
              "dinner": {"name": "Chicken Stir-fry", "calories": 480, "description": "Chicken breast with mixed vegetables and brown rice"}
            },
            "totalCalories": 1220
          }
        ],
        "totalWeeklyCalories": 8750
      }
      
      Ensure meals are balanced, nutritious, and align with the specified goals. Include all 7 days of the week.`;

      const messages = [
        {
          role: "system",
          content: "You are a professional nutritionist creating meal plans. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ];

      const aiResponse = await callGroqAPI(messages);
      
      // Parse the AI response to extract meal plan data
      let mealPlanData;
      try {
        mealPlanData = JSON.parse(aiResponse);
      } catch (parseError) {
        // Fallback meal plan if AI response isn't valid JSON
        mealPlanData = {
          name: "AI-Generated Meal Plan",
          days: [
            {
              day: "Monday",
              meals: {
                breakfast: { name: "Oatmeal with Berries", calories: 350, description: "Steel-cut oats topped with mixed berries and almonds" },
                lunch: { name: "Quinoa Power Bowl", calories: 480, description: "Quinoa with grilled chicken and roasted vegetables" },
                dinner: { name: "Salmon & Vegetables", calories: 420, description: "Grilled salmon with steamed broccoli and sweet potato" }
              },
              totalCalories: 1250
            },
            {
              day: "Tuesday", 
              meals: {
                breakfast: { name: "Greek Yogurt Parfait", calories: 320, description: "Greek yogurt with granola and fresh fruit" },
                lunch: { name: "Turkey Sandwich", calories: 420, description: "Whole grain turkey sandwich with avocado" },
                dinner: { name: "Chicken Stir-fry", calories: 480, description: "Chicken breast with mixed vegetables and brown rice" }
              },
              totalCalories: 1220
            },
            {
              day: "Wednesday",
              meals: {
                breakfast: { name: "Smoothie Bowl", calories: 340, description: "Protein smoothie bowl with fruits and nuts" },
                lunch: { name: "Lentil Soup", calories: 400, description: "Hearty lentil soup with whole grain bread" },
                dinner: { name: "Baked Cod", calories: 450, description: "Baked cod with roasted vegetables" }
              },
              totalCalories: 1190
            },
            {
              day: "Thursday",
              meals: {
                breakfast: { name: "Avocado Toast", calories: 360, description: "Whole grain toast with avocado and egg" },
                lunch: { name: "Chicken Salad", calories: 440, description: "Grilled chicken salad with mixed greens" },
                dinner: { name: "Beef Stir-fry", calories: 490, description: "Lean beef with vegetables and quinoa" }
              },
              totalCalories: 1290
            },
            {
              day: "Friday",
              meals: {
                breakfast: { name: "Protein Pancakes", calories: 330, description: "High-protein pancakes with berries" },
                lunch: { name: "Tuna Wrap", calories: 410, description: "Tuna wrap with vegetables and hummus" },
                dinner: { name: "Pork Tenderloin", calories: 470, description: "Lean pork tenderloin with sweet potato" }
              },
              totalCalories: 1210
            },
            {
              day: "Saturday",
              meals: {
                breakfast: { name: "Egg Scramble", calories: 380, description: "Scrambled eggs with vegetables and cheese" },
                lunch: { name: "Buddha Bowl", calories: 460, description: "Quinoa buddha bowl with roasted vegetables" },
                dinner: { name: "Grilled Chicken", calories: 440, description: "Grilled chicken breast with steamed vegetables" }
              },
              totalCalories: 1280
            },
            {
              day: "Sunday",
              meals: {
                breakfast: { name: "French Toast", calories: 370, description: "Whole grain French toast with fresh fruit" },
                lunch: { name: "Veggie Burger", calories: 430, description: "Plant-based burger with sweet potato fries" },
                dinner: { name: "Salmon Fillet", calories: 460, description: "Baked salmon with asparagus and rice" }
              },
              totalCalories: 1260
            }
          ],
          totalWeeklyCalories: 8700
        };
      }

      const mealPlan = await storage.createMealPlan({
        userId,
        name: mealPlanData.name,
        meals: mealPlanData.days,
        totalCalories: mealPlanData.totalWeeklyCalories,
        targetDate: new Date(),
      });

      res.json(mealPlan);
    } catch (error) {
      console.error("Meal plan generation error:", error);
      res.status(500).json({ error: "Failed to generate meal plan" });
    }
  });

  // Food items endpoints
  app.get("/api/food-items", async (req, res) => {
    try {
      const query = req.query.search as string;
      let foodItems;
      
      if (query) {
        foodItems = await storage.searchFoodItems(query);
      } else {
        foodItems = await storage.getFoodItems();
      }
      
      res.json(foodItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch food items" });
    }
  });

  app.get("/api/food-items/:id", async (req, res) => {
    try {
      const foodItem = await storage.getFoodItem(req.params.id);
      if (!foodItem) {
        return res.status(404).json({ error: "Food item not found" });
      }
      res.json(foodItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch food item" });
    }
  });

  // Calorie tracking endpoints
  app.get("/api/calorie-entries/:userId", async (req, res) => {
    try {
      const date = req.query.date ? new Date(req.query.date as string) : undefined;
      const entries = await storage.getCalorieEntries(req.params.userId, date);
      
      // Populate food item details
      const entriesWithFoodDetails = await Promise.all(
        entries.map(async (entry) => {
          const foodItem = await storage.getFoodItem(entry.foodItemId || "");
          return {
            ...entry,
            foodItem,
            totalCalories: foodItem ? Math.round(foodItem.caloriesPerServing * parseFloat(entry.servings || "1")) : 0
          };
        })
      );
      
      res.json(entriesWithFoodDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch calorie entries" });
    }
  });

  app.post("/api/calorie-entries", async (req, res) => {
    try {
      const entryData = insertCalorieEntrySchema.parse(req.body);
      const entry = await storage.createCalorieEntry(entryData);
      
      // Return entry with food item details
      const foodItem = await storage.getFoodItem(entry.foodItemId || "");
      const entryWithFood = {
        ...entry,
        foodItem,
        totalCalories: foodItem ? Math.round(foodItem.caloriesPerServing * parseFloat(entry.servings || "1")) : 0
      };
      
      res.json(entryWithFood);
    } catch (error) {
      console.error("Calorie entry error:", error);
      res.status(500).json({ error: "Failed to create calorie entry" });
    }
  });

  app.delete("/api/calorie-entries/:id", async (req, res) => {
    try {
      const success = await storage.deleteCalorieEntry(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Calorie entry not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete calorie entry" });
    }
  });

  // BMI and fitness recommendations
  app.post("/api/fitness/recommendations", async (req, res) => {
    try {
      const { weight, height, age, activityLevel, fitnessGoal } = req.body;
      
      const bmi = weight / Math.pow(height / 100, 2);
      let bmiCategory = "";
      
      if (bmi < 18.5) bmiCategory = "underweight";
      else if (bmi < 25) bmiCategory = "normal weight";
      else if (bmi < 30) bmiCategory = "overweight";
      else bmiCategory = "obese";

      const prompt = `Based on the following profile, provide personalized fitness and nutrition recommendations:
      - BMI: ${bmi.toFixed(1)} (${bmiCategory})
      - Age: ${age}
      - Activity Level: ${activityLevel}
      - Fitness Goal: ${fitnessGoal}
      
      Provide specific workout recommendations, suggested calorie intake, and nutritional guidelines. Be encouraging and practical.`;

      const messages = [
        {
          role: "system",
          content: "You are a certified fitness and nutrition coach providing personalized recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ];

      const recommendations = await callGroqAPI(messages);

      res.json({
        bmi: bmi.toFixed(1),
        bmiCategory,
        recommendations,
      });
    } catch (error) {
      console.error("Fitness recommendations error:", error);
      res.status(500).json({ error: "Failed to generate fitness recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
