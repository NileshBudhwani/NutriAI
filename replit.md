# NutriAI - AI-Powered Nutrition & Fitness Companion

## Overview

NutriAI is a comprehensive full-stack web application that provides personalized nutrition guidance and fitness advice through AI-powered interactions. The application combines a React-based frontend with an Express backend, utilizing the Groq API for intelligent chatbot functionality and nutritional recommendations.

The system enables users to chat with an AI nutritionist, generate personalized meal plans, track calories, and receive tailored fitness advice. Built for hackathons and production use, it features a clean, responsive design with modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent, accessible design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Component Structure**: Modular component architecture with separate directories for pages, components, and UI elements

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API endpoints for chat, meal planning, calorie tracking, and food items
- **Storage**: In-memory storage with interface abstraction for future database integration
- **Development Setup**: Hot reloading with Vite integration in development mode

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Comprehensive data models including:
  - Users with profile information (age, weight, height, fitness goals)
  - Chat messages for conversation history
  - Meal plans with JSON-based meal storage
  - Food items with nutritional information
  - Calorie entries for daily tracking
- **Migration Strategy**: Schema-first approach with migrations directory

### Authentication & Authorization
- **Current State**: Mock user system with hardcoded user IDs for development
- **Prepared Architecture**: User schema and authentication endpoints ready for JWT implementation
- **Session Management**: Structure in place for secure session handling

### AI Integration
- **Provider**: Groq API using the mixtral-8x7b-32768 model
- **Features**: 
  - Conversational AI for nutrition advice
  - Contextual meal planning based on user preferences
  - Calorie calculation and dietary recommendations
  - Fitness guidance integration
- **Error Handling**: Comprehensive error management with fallback responses

### UI/UX Design
- **Design System**: Custom CSS variables with dark/light mode support
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: Radix UI primitives ensuring WCAG compliance
- **Animation**: Smooth transitions and loading states for enhanced user experience

### Development Workflow
- **Build Process**: Separate client and server builds with optimized production bundles
- **Development Server**: Integrated Vite dev server with Express API proxy
- **Type Safety**: Full TypeScript coverage with shared types between client and server
- **Code Quality**: ESLint and TypeScript strict mode for code consistency

## External Dependencies

### Core AI Services
- **Groq API**: Primary AI service for chatbot functionality and nutritional advice generation
- **Model**: mixtral-8x7b-32768 for high-quality conversational responses

### Database & Storage
- **Neon Database**: PostgreSQL-compatible serverless database (configured via DATABASE_URL)
- **Drizzle ORM**: Type-safe database operations with schema management
- **Connection**: @neondatabase/serverless for optimized serverless connections

### UI & Frontend Libraries
- **React Query**: Server state management and caching
- **Radix UI**: Accessible UI primitives for components
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography
- **Wouter**: Lightweight routing solution

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **PostCSS**: CSS processing with Tailwind integration

### Optional Integrations
- **Image Services**: Unsplash integration for food and fitness imagery
- **Analytics**: Ready for integration with analytics services
- **Email Services**: Structure prepared for notification systems