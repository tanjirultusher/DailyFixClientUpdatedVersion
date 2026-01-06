import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { serviceService } from "../services/serviceService";
import { bookingService } from "../services/bookingService";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  Calendar,
  ArrowLeft
} from "lucide-react";

const ServiceDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    document.title = "Service Details - DailyFix";
    if (_id) {
      fetchServiceDetail();
      fetchRelatedServices();
    }
  }, [_id]);

  const fetchServiceDetail = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getServiceById(_id);
      setService(data);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedServices = async () => {
    try {
      const data = await serviceService.getAllServices({ limit: 4 });
      setRelatedServices(data.services?.filter(s => s._id !== _id) || []);
    } catch (error) {
      console.error("Error fetching related services:", error);
    }
  };

  const handleBookService = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);
      const bookingData = {
        serviceId: service._id,
        serviceName: service.serviceName,
        serviceTitle: service.serviceName,
        price: service.price,
        customerEmail: user.email,
        customerName: user.displayName || user.email,
        providerId: service.providerId,
        providerEmail: service.providerEmail,
        bookingDate: new Date().toLocaleDateString(),
        scheduledDate: new Date().toISOString(),
        status: 'pending'
      };

      await bookingService.createBooking(bookingData);
      alert("Service booked successfully!");
      navigate("/dashboard/bookings");
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Failed to book service. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Service Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Service Image */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              {service.serviceImage ? (
                <img
                  src={service.serviceImage}
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{service.serviceName}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                {service.serviceArea && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {service.serviceArea}
                  </div>
                )}
                {service.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {service.rating}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {service.description || "Professional service with quality guarantee."}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                ${service.price || 0}
              </span>
              <span className="text-muted-foreground">/ service</span>
            </div>

            {/* Provider Info */}
            {service.providerName && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{service.providerName}</p>
                      {service.providerEmail && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {service.providerEmail}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Book Service Button */}
            <div className="space-y-3">
              <Button 
                onClick={handleBookService}
                disabled={bookingLoading}
                className="w-full"
                size="lg"
              >
                {bookingLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book This Service
                  </>
                )}
              </Button>
              {!user && (
                <p className="text-sm text-muted-foreground text-center">
                  Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to book this service
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Service Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Service Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Professional</Badge>
                <span className="text-sm">Certified professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Insured</Badge>
                <span className="text-sm">Fully insured service</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Guaranteed</Badge>
                <span className="text-sm">Quality guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Support</Badge>
                <span className="text-sm">24/7 customer support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Services</CardTitle>
              <CardDescription>You might also be interested in these services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedServices.slice(0, 3).map((relatedService) => (
                  <Link
                    key={relatedService._id}
                    to={`/service/${relatedService._id}`}
                    className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="aspect-video bg-muted rounded mb-3 overflow-hidden">
                      {relatedService.serviceImage ? (
                        <img
                          src={relatedService.serviceImage}
                          alt={relatedService.serviceName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium mb-1 truncate">{relatedService.serviceName}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {relatedService.description || "Professional service"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600">
                        ${relatedService.price || 0}
                      </span>
                      {relatedService.serviceArea && (
                        <span className="text-xs text-muted-foreground">
                          {relatedService.serviceArea}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;