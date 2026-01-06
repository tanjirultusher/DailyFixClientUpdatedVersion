import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  ArrowRight, 
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown
} from "lucide-react";
import { serviceService } from "../services/serviceService";
import { debounce } from "../lib/utils";

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    'All Categories',
    'Home Cleaning',
    'Plumbing',
    'Electrical',
    'Gardening',
    'Tutoring',
    'Pet Care',
    'Beauty & Wellness',
    'Automotive',
    'Technology',
    'Moving & Storage'
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200 - $500', value: '200-500' },
    { label: 'Over $500', value: '500+' }
  ];

  const sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Newest First', value: 'newest' }
  ];

  useEffect(() => {
    document.title = "Services - DailyFix";
    fetchServices();
  }, [searchQuery, selectedCategory, priceRange, sortBy, currentPage]);

  const debouncedSearch = useMemo(
    () => debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1);
    }, 300),
    []
  );

  const fetchServices = async () => {
    try {
      setLoading(true);
      
      const filters = {
        search: searchQuery,
        category: selectedCategory === 'All Categories' ? '' : selectedCategory,
        priceRange,
        sortBy,
        page: currentPage,
        limit: 12
      };

      const response = await serviceService.getAllServices(filters);
      setServices(response.services || response);
      setTotalPages(response.totalPages || 1);
      
      // Update URL params
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory && selectedCategory !== 'All Categories') params.set('category', selectedCategory);
      if (priceRange) params.set('price', priceRange);
      if (sortBy !== 'popular') params.set('sort', sortBy);
      if (currentPage > 1) params.set('page', currentPage.toString());
      
      setSearchParams(params);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const ServiceCard = ({ service, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`overflow-hidden card-hover h-full ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
        <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
          <img
            src={service.image || '/api/placeholder/300/200'}
            alt={service.serviceName}
            className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
          />
          <Badge className="absolute top-2 right-2">
            <Star className="h-3 w-3 mr-1" />
            {service.rating || '4.8'}
          </Badge>
        </div>
        
        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="line-clamp-1">{service.serviceName}</CardTitle>
                <CardDescription className={viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-2'}>
                  {service.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">
                ${service.price}
              </span>
              <Badge variant="secondary">{service.category}</Badge>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
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
        </div>
      </Card>
    </motion.div>
  );

  const ServiceSkeleton = () => (
    <Card className="overflow-hidden">
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
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Service</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Browse through thousands of professional services
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for services..."
                  defaultValue={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category || (selectedCategory === '' && category === 'All Categories')}
                          onChange={() => handleCategoryChange(category === 'All Categories' ? '' : category)}
                          className="text-primary"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={priceRange === range.value}
                          onChange={() => handlePriceRangeChange(range.value)}
                          className="text-primary"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  {loading ? 'Loading...' : `${services.length} services found`}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none bg-background border border-input rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Services Grid/List */}
            {loading ? (
              <div className={viewMode === 'grid' ? 'responsive-grid' : 'space-y-4'}>
                {[...Array(12)].map((_, i) => (
                  <ServiceSkeleton key={i} />
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className={viewMode === 'grid' ? 'responsive-grid' : 'space-y-4'}>
                {services.map((service, index) => (
                  <ServiceCard key={service._id} service={service} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No services found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all services
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;