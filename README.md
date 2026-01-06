# DailyFix - Professional Service Platform

A modern, production-ready React application for connecting customers with trusted service providers.

## 🚀 Features

### Core Features
- **User Authentication**: Firebase Auth with email/password and Google OAuth
- **Role-Based Access Control**: User, Provider, and Admin roles with appropriate permissions
- **Service Management**: Browse, search, filter, and book services
- **Dashboard System**: Role-specific dashboards with analytics and management tools
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Real-time Updates**: Live notifications and status updates



## 🛠 Tech Stack

- **Frontend**: React 19
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Authentication**: Firebase Auth
- **Forms**: React Hook Form + Zod validation
- **Charts**: Chart.js + React Chart.js 2
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Build Tool**: Vite


## 🔐 Authentication & Authorization

### User Roles
1. **User**: Can browse and book services
2. **Provider**: Can offer services and manage bookings
3. **Admin**: Full platform management access

### Features
- Email/password authentication
- Google OAuth integration
- Role-based route protection
- Profile management
- Password reset functionality

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Proper touch targets and interactions
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daily-fix-client
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env` file with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Dashboard Features

### User Dashboard
- Booking overview and statistics
- Recent booking history
- Profile management
- Service browsing shortcuts

### Provider Dashboard
- Service management
- Booking requests and management
- Revenue analytics
- Customer reviews

### Admin Dashboard
- User management
- Service oversight
- Platform analytics
- System monitoring
