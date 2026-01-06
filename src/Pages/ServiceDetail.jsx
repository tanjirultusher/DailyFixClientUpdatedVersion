import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { 
  Star, 
  Calendar, 
  DollarSign, 
  User, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Heart,
  Share2,
  MessageCircle,
  ChevronLeft,
  CheckCircle,
  Award,
  Zap,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const servicesPromise = fetch("https://dailyfix-server.vercel.app/services").then((res) => res.json());

const ServiceDetail = () => {
  const { _id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    servicesPromise
      .then((services) => {
        const selected = services.find((s) => s._id === _id);
        setService(selected);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [_id]);

  useEffect(() => {
    document.title = service ? `${service.serviceTitle} - DailyFix` : "Service Details - DailyFix";
  }, [service]);

  useEffect(() => {
    if (!service) return;

    fetch("https://dailyfix-server.vercel.app/bookings")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) =>
            item.serviceTitle === service.serviceTitle && item.rating > 0
        );
        setReviews(filtered);
      });
  }, [service]);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-video bg-muted animate-pulse rounded-xl"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-8 bg-muted animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
              </div>
              <div className="h-12 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Service Not Found</h3>
            <p className="text-muted-foreground mb-4">The service you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/services')} className="w-full">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBookingModalOpen = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required!",
        text: "Please login to book this service.",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (user?.email === service.providerEmail) {
      Swal.fire({
        title: "Not Allowed!",
        text: "You cannot book your own service.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBooking = {
      userEmail: user?.email,
      serviceTitle: service.serviceTitle,
      image: service.image,
      serviceId: service._id,
      review,
      rating: Number(rating),
      bookingDate: new Date().toISOString().split("T")[0],
      price: service.minPrice,
      status: "pending",
      providerEmail: service.providerEmail,
      providerName: service.providerName,
      customerName: user?.displayName || user?.email?.split('@')[0],
      scheduledDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://dailyfix-server.vercel.app/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        Swal.fire({
          title: "Booking Successful!",
          text: "Your booking request has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        setIsBookingOpen(false);
        setReview("");
        setRating(0);
      } else {
        throw new Error('Booking failed');
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Failed to place booking. Please try again.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.serviceTitle,
          text: service.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        title: "Link Copied!",
        text: "Service link has been copied to clipboard.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Services
          </Button>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Service Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="overflow-hidden">
              <div className="relative group">
                <img
                  src={service.image}
                  alt={service.serviceTitle}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {service.category}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Service Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </Card>
              <Card className="text-center p-4">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold">{reviews.length}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </Card>
              <Card className="text-center p-4">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm text-muted-foreground">Response</div>
              </Card>
            </div>
          </motion.div>

          {/* Service Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Service Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">{service.serviceTitle}</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(averageRating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Verified
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      ৳{service.minPrice}
                      {service.maxPrice !== service.minPrice && (
                        <span className="text-lg text-muted-foreground"> - ৳{service.maxPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Starting price</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    Best Value
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Service Provider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${service.providerName}`} />
                    <AvatarFallback>
                      {service.providerName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{service.providerName}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {service.providerEmail}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified Provider
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">4.8 (120+ reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6"
                    onClick={handleBookingModalOpen}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book This Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Confirm Your Booking
                    </DialogTitle>
                    <DialogDescription>
                      Please review your booking details and provide a rating.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service</label>
                      <Input value={service.serviceTitle} readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Email</label>
                      <Input value={user?.email || ""} readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price</label>
                      <Input value={`৳${service.minPrice}`} readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 cursor-pointer transition-colors ${
                              (hoverRating || rating) >= star
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300 hover:text-yellow-400'
                            }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Review (Optional)</label>
                      <Textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your thoughts about this service..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsBookingOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Booking...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Provider
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Ask Question
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Customer Reviews ({reviews.length})
              </CardTitle>
              <CardDescription>
                See what our customers are saying about this service
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground">
                    Be the first to review this service and help others make informed decisions.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((rev, index) => (
                    <motion.div
                      key={rev._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-muted pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${rev.userEmail}`} />
                          <AvatarFallback>
                            {rev.userEmail?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">
                                {rev.userEmail?.split('@')[0]}
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < rev.rating
                                          ? 'text-yellow-500 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {rev.rating}/5
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Verified Purchase
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {rev.review || "No written review provided."}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(rev.bookingDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;