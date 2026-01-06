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

### UI/UX Features
- **Modern Design System**: Built with shadcn/ui components and Tailwind CSS
- **Professional Animations**: Smooth transitions with Framer Motion
- **Advanced Search & Filtering**: Multi-criteria search with sorting and pagination
- **Interactive Charts**: Data visualization with Chart.js
- **Skeleton Loading**: Professional loading states throughout the app
- **Form Validation**: Comprehensive validation with React Hook Form and Zod

### Technical Features
- **Production Architecture**: Scalable folder structure and component organization
- **API Integration**: Centralized API service layer with error handling
- **State Management**: Context API with role-based state management
- **Error Boundaries**: Comprehensive error handling and user feedback
- **SEO Optimized**: Dynamic page titles and meta information
- **Performance Optimized**: Code splitting and lazy loading

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript-ready
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

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── Home.jsx           # Landing page with hero section
│   ├── Login.jsx          # Enhanced login form
│   ├── Register.jsx       # Registration with role selection
│   └── Navbar.jsx         # Responsive navigation
├── Pages/
│   ├── Dashboard.jsx      # Role-based dashboard
│   ├── Services.jsx       # Service listing with filters
│   ├── Profile.jsx        # User profile management
│   ├── About.jsx          # About page
│   ├── Contact.jsx        # Contact form
│   ├── Terms.jsx          # Terms of service
│   └── Privacy.jsx        # Privacy policy
├── Layout/
│   ├── Root.jsx           # Main layout wrapper
│   └── DashboardLayout.jsx # Dashboard layout with sidebar
├── contexts/
│   ├── AuthContext.jsx    # Authentication context
│   └── AuthProvider.jsx   # Enhanced auth provider with roles
├── services/
│   ├── api.js             # Axios configuration
│   ├── serviceService.js  # Service-related API calls
│   ├── userService.js     # User management API calls
│   └── bookingService.js  # Booking management API calls
├── lib/
│   └── utils.js           # Utility functions
└── Route/
    └── PrivateRoute.jsx   # Protected route component
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8b5cf6) - Main brand color
- **Secondary**: Teal (#14b8a6) - Accent color
- **Neutral**: Gray scale for text and backgrounds
- **Status Colors**: Success (green), Warning (yellow), Error (red)

### Typography
- **Font**: Inter (system fallback)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good line height

### Components
- **Cards**: Consistent border radius, shadow, and padding
- **Buttons**: Multiple variants with proper states
- **Forms**: Enhanced validation and error states
- **Navigation**: Responsive with mobile-first approach

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

## 🔧 API Integration

The application uses a centralized API service layer with:
- Axios interceptors for request/response handling
- Automatic error handling and user feedback
- Token management for authenticated requests
- Retry logic for failed requests

## 🎯 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Proper image sizing and formats
- **Caching**: API response caching where appropriate
- **Bundle Analysis**: Optimized bundle size

## 🧪 Testing

The project is set up for testing with:
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user flows
- E2E tests with Cypress (optional)

## 📈 Analytics & Monitoring

- User interaction tracking
- Performance monitoring
- Error tracking and reporting
- Conversion funnel analysis

## 🔒 Security Features

- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure authentication flow
- Role-based access control

## 🌐 SEO & Accessibility

- Dynamic meta tags
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email support@dailyfix.com or join our community Discord server.

---

Built with ❤️ by the DailyFix team

## 🎨 Enhanced Home Page Features

### Hero Slider Section
- **4 Dynamic Slides**: Professional service images with compelling headlines and details
- **Auto-play Functionality**: Slides automatically change every 5 seconds
- **Manual Navigation**: Previous/Next arrows and clickable indicators
- **Smooth Animations**: Framer Motion powered slide transitions
- **Explore Button**: Direct navigation to services page
- **Responsive Design**: Optimized for all screen sizes

### Dynamic Services Section
- **6 Services Display**: Fetched directly from database
- **Loading States**: Professional skeleton loaders during data fetch
- **Interactive Cards**: Hover animations and smooth transitions
- **Service Details**: Image, title, description, price, rating, and provider info
- **View Details Button**: Direct navigation to individual service pages

### Static Sections

#### Why Choose Us
- **4 Key Features**: Verified Professionals, 24/7 Support, Quality Guarantee, Best Prices
- **Icon Integration**: Lucide React icons for visual appeal
- **Hover Effects**: Scale animations on card hover
- **Professional Design**: Consistent card layout with purple accent colors

#### Customer Testimonials
- **3 Real Testimonials**: Customer photos, names, roles, and reviews
- **Star Ratings**: Visual 5-star rating display
- **Quote Styling**: Professional quote formatting with quote icons
- **Responsive Grid**: Adapts to different screen sizes

### Animation Features
- **Framer Motion Integration**: Smooth, professional animations throughout
- **Scroll-triggered Animations**: Elements animate when they come into view
- **Staggered Animations**: Sequential animation of multiple elements
- **Hover Interactions**: Interactive feedback on user actions
- **Page Transitions**: Smooth transitions between sections

### Additional Features
- **Statistics Section**: Dynamic counters with gradient background
- **CTA Section**: Call-to-action with gradient background and multiple buttons
- **SEO Optimized**: Dynamic page titles and meta information
- **Performance Optimized**: Lazy loading and efficient rendering
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Technical Implementation
- **React Hooks**: useState, useEffect, useContext for state management
- **React Router**: Navigation between pages and sections
- **Service Integration**: Real API calls to fetch dynamic content
- **Error Handling**: Graceful error handling for API failures
- **Loading States**: Professional loading indicators
- **Responsive Images**: Optimized images with proper aspect ratios

### Slider Configuration
```javascript
const heroSlides = [
  {
    id: 1,
    image: 'professional-service-image.jpg',
    headline: 'Service Title',
    details: 'Detailed description of the service',
    category: 'Service Category'
  }
  // ... more slides
];
```

### Animation Utilities
- **Custom Animation Library**: Reusable animation presets
- **Consistent Timing**: Standardized animation durations
- **Performance Optimized**: GPU-accelerated animations
- **Accessibility Friendly**: Respects user motion preferences