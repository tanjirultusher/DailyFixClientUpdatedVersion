import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle, 
  Clock, 
  XCircle,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  Eye
} from 'lucide-react';

// Utility function to format currency
const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  } else {
    return `$${amount.toLocaleString()}`;
  }
};

const BookingsManagement = () => {
  const { isAdmin } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    document.title = 'Bookings Management - DailyFix';
    if (isAdmin()) {
      fetchBookings();
    }
  }, [currentPage, searchTerm, filterStatus, isAdmin]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // Fetch data directly from the provided API
      const response = await fetch('https://dailyfix-server.vercel.app/bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      
      // Filter bookings based on search term and status
      let filteredBookings = data || [];
      
      if (searchTerm) {
        filteredBookings = filteredBookings.filter(booking => 
          booking.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.service?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (filterStatus !== 'all') {
        filteredBookings = filteredBookings.filter(booking => booking.status === filterStatus);
      }
      
      // Pagination
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
      
      setBookings(paginatedBookings);
      setTotalPages(Math.ceil(filteredBookings.length / 10));
      
      // Calculate stats from all bookings (not just filtered)
      const totalRevenue = data.reduce((sum, booking) => sum + (booking.price || 0), 0);
      setStats({
        total: data.length || 0,
        pending: data.filter(b => b.status === 'pending').length || 0,
        completed: data.filter(b => b.status === 'completed').length || 0,
        cancelled: data.filter(b => b.status === 'cancelled').length || 0,
        totalRevenue: totalRevenue
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`https://dailyfix-server.vercel.app/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
      
      // Refresh the bookings list
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`https://dailyfix-server.vercel.app/bookings/${bookingId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }
        
        // Refresh the bookings list
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  if (!isAdmin()) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings Management</h1>
          <p className="text-muted-foreground">Manage all platform bookings and their status</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { title: 'Total Bookings', value: stats.total, icon: Calendar, color: 'text-blue-600' },
          { title: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
          { title: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-600' },
          { title: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-600' },
          { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-purple-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold truncate">{stat.value}</div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Booking List</CardTitle>
          <CardDescription>Search and filter bookings by status and details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search bookings by service or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
                  <div className="w-12 h-12 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="w-20 h-6 bg-muted rounded"></div>
                  <div className="w-16 h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking, index) => {
                const StatusIcon = getStatusIcon(booking.status);
                return (
                  <div
                    key={booking._id || index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <StatusIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.serviceName || booking.service || 'Service'}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {booking.customerName || booking.customerEmail || 'Customer'}
                          </div>
                          {booking.customerPhone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {booking.customerPhone}
                            </div>
                          )}
                          {booking.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {booking.location}
                            </div>
                          )}
                        </div>
                        {booking.scheduledDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.scheduledDate).toLocaleDateString()} at {new Date(booking.scheduledDate).toLocaleTimeString()}
                          </div>
                        )}
                        {booking.createdAt && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <span>Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium">${booking.price || 0}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {booking._id}
                        </p>
                      </div>
                      
                      <Badge className={getStatusBadgeColor(booking.status)}>
                        {booking.status || 'pending'}
                      </Badge>
                      
                      <div className="flex items-center gap-1">
                        <select
                          value={booking.status || 'pending'}
                          onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                          className="px-2 py-1 text-xs border border-input bg-background rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManagement;