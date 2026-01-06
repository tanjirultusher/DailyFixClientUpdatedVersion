import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ChevronLeft,
  ChevronRight,
  Star, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  Clock,
  Award,
  TrendingUp,
  Quote,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { serviceService } from '../services/serviceService';
import { Skeleton } from './ui/skeleton';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      headline: 'Professional Home Cleaning Services',
      details: 'Transform your home with our expert cleaning professionals. Reliable, thorough, and affordable cleaning services for every room in your house.',
      category: 'Home Cleaning'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      headline: 'Expert Plumbing Solutions',
      details: 'From emergency repairs to complete installations, our certified plumbers provide fast, reliable service 24/7. No job too big or small.',
      category: 'Plumbing'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      headline: 'Personalized Tutoring Services',
      details: 'Unlock your potential with our experienced tutors. One-on-one sessions tailored to your learning style and academic goals.',
      category: 'Education'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      headline: 'Beautiful Garden Maintenance',
      details: 'Keep your outdoor space pristine with our professional gardening services. From lawn care to landscape design.',
      category: 'Gardening'
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'DailyFix connected me with an amazing cleaning service. Professional, reliable, and my house has never looked better!'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'The plumber I found through DailyFix saved my business from a major disaster. Quick response and excellent work!'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Parent',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Found the perfect tutor for my daughter through DailyFix. Her grades have improved dramatically!'
    }
  ];

  // Why choose us features
  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All service providers are thoroughly vetted and verified for your safety and peace of mind.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any questions or concerns.'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'We guarantee the quality of all services with our satisfaction guarantee policy.'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive pricing with transparent costs and no hidden fees.'
    }
  ];

  // Statistics
  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50,000+', label: 'Services Completed' },
    { number: '2,500+', label: 'Expert Providers' },
    { number: '100+', label: 'Cities Covered' }
  ];

  useEffect(() => {
    document.title = "DailyFix - Your Trusted Service Platform";
    fetchServices();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAllServices({ limit: 6 });
      setServices(Array.isArray(data) ? data : data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleExploreServices = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroSlides[currentSlide].image})`
              }}
            >
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                      {heroSlides[currentSlide].category}
                    </Badge>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      {heroSlides[currentSlide].headline}
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                      {heroSlides[currentSlide].details}
                    </p>

                    <Button 
                      size="lg" 
                      onClick={handleExploreServices}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                    >
                      Explore Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-purple-600 to-teal-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Service Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Categories</h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Explore our wide range of professional services across different categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Home Cleaning', icon: '🏠', count: '150+ Services', color: 'bg-blue-100 text-blue-600' },
              { name: 'Plumbing', icon: '🔧', count: '80+ Services', color: 'bg-green-100 text-green-600' },
              { name: 'Electrical', icon: '⚡', count: '65+ Services', color: 'bg-yellow-100 text-yellow-600' },
              { name: 'Gardening', icon: '🌱', count: '90+ Services', color: 'bg-emerald-100 text-emerald-600' },
              { name: 'Tutoring', icon: '📚', count: '120+ Services', color: 'bg-purple-100 text-purple-600' },
              { name: 'Pet Care', icon: '🐕', count: '45+ Services', color: 'bg-pink-100 text-pink-600' },
              { name: 'Beauty & Wellness', icon: '💆', count: '75+ Services', color: 'bg-rose-100 text-rose-600' },
              { name: 'Technology', icon: '💻', count: '55+ Services', color: 'bg-indigo-100 text-indigo-600' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/services?category=${encodeURIComponent(category.name)}`}>
                  <Card className="text-center h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-2xl mx-auto mb-4`}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most requested services from trusted professionals
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={service.image || `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                        alt={service.serviceName}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {service.rating || '4.8'}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{service.serviceName}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {service.description || 'Professional service with experienced providers'}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-purple-600">
                          ${service.price}
                        </span>
                        <Badge variant="secondary">{service.category || 'Service'}</Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <Users className="h-4 w-4 mr-1" />
                        {service.providerName || 'Professional Provider'}
                      </div>
                      
                      <Button asChild className="w-full">
                        <Link to={`/service/${service._id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Getting the help you need is simple with our easy 4-step process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Browse Services',
                description: 'Explore our wide range of professional services and find exactly what you need.',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Choose Provider',
                description: 'Select from verified professionals based on ratings, reviews, and pricing.',
                icon: '👥'
              },
              {
                step: '03',
                title: 'Book & Pay',
                description: 'Schedule your service at a convenient time and make secure payment.',
                icon: '💳'
              },
              {
                step: '04',
                title: 'Get Service',
                description: 'Enjoy professional service delivery and rate your experience.',
                icon: '✅'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 dark:text-gray-800">
                    {step.step}
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DailyFix?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing you with the best service experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit">
                        <Icon className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Providers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet some of our top-rated service providers who deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                specialty: 'Home Cleaning Expert',
                rating: 4.9,
                reviews: 127,
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                badge: 'Top Rated',
                experience: '5+ years'
              },
              {
                name: 'Mike Rodriguez',
                specialty: 'Licensed Plumber',
                rating: 4.8,
                reviews: 89,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                badge: 'Verified Pro',
                experience: '8+ years'
              },
              {
                name: 'Emily Chen',
                specialty: 'Math & Science Tutor',
                rating: 5.0,
                reviews: 156,
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                badge: 'Expert',
                experience: '6+ years'
              }
            ].map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                        {provider.badge}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                    <p className="text-muted-foreground mb-3">{provider.specialty}</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{provider.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.experience} experience</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-purple-200 dark:text-purple-800" />
                      <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                        {testimonial.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about our platform and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How do I book a service?',
                answer: 'Simply browse our services, select the one you need, choose a provider, and book directly through our platform. You can schedule at your convenience and pay securely online.'
              },
              {
                question: 'Are all service providers verified?',
                answer: 'Yes, all our service providers go through a thorough verification process including background checks, skill assessments, and customer reviews to ensure quality and safety.'
              },
              {
                question: 'What if I\'m not satisfied with the service?',
                answer: 'We have a satisfaction guarantee policy. If you\'re not happy with the service, contact our support team within 24 hours and we\'ll work to resolve the issue or provide a refund.'
              },
              {
                question: 'How do payments work?',
                answer: 'Payments are processed securely through our platform. You can pay by credit card, debit card, or digital wallet. Payment is typically charged after the service is completed.'
              },
              {
                question: 'Can I reschedule or cancel a booking?',
                answer: 'Yes, you can reschedule or cancel bookings through your dashboard. Cancellation policies vary by provider and are clearly stated during booking.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter for the latest updates, tips, and exclusive offers
            </p>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Button size="lg" className="px-8">
                    Subscribe
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-purple-600 to-teal-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers who trust DailyFix for their service needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/services">
                  Find Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              {!user && (
                <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
                  <Link to="/register">
                    Become a Provider
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;