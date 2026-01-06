import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

const Dashboard = () => {
  const { user, userProfile, isAdmin, isProvider } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalServices: 0,
    totalUsers: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    averageRating: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard - DailyFix';
    fetchDashboardData();
  }, [user, userProfile]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      if (isAdmin()) {
        // Admin dashboard data - fetch all users and bookings
        const [usersResponse, bookingsResponse] = await Promise.all([
          fetch('https://dailyfix-server.vercel.app/users'),
          fetch('https://dailyfix-server.vercel.app/bookings')
        ]);
        
        const users = await usersResponse.json();
        const bookings = await bookingsResponse.json();
        
        // Calculate admin stats
        const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);
        const pendingBookings = bookings.filter(b => b.status === 'pending').length;
        const completedBookings = bookings.filter(b => b.status === 'completed').length;
        const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
        
        setStats({
          totalBookings: bookings.length,
          totalRevenue: totalRevenue,
          totalServices: 0, // Will need services API
          totalUsers: users.length,
          pendingBookings: pendingBookings,
          completedBookings: completedBookings,
          cancelledBookings: cancelledBookings,
          averageRating: 4.5 // Placeholder
        });
        
        setRecentBookings(bookings.slice(0, 5));
        
      } else if (isProvider()) {
        // Provider dashboard data - filter bookings by provider
        const bookingsResponse = await fetch('https://dailyfix-server.vercel.app/bookings');
        const allBookings = await bookingsResponse.json();
        
        // Filter bookings for this provider (assuming providerId matches user.uid)
        const providerBookings = allBookings.filter(booking => 
          booking.providerId === user.uid || booking.providerEmail === user.email
        );
        
        const totalRevenue = providerBookings.reduce((sum, booking) => sum + (booking.price || 0), 0);
        const pendingBookings = providerBookings.filter(b => b.status === 'pending').length;
        const completedBookings = providerBookings.filter(b => b.status === 'completed').length;
        const cancelledBookings = providerBookings.filter(b => b.status === 'cancelled').length;
        
        setStats({
          totalBookings: providerBookings.length,
          totalRevenue: totalRevenue,
          totalServices: 0, // Will need services API
          pendingBookings: pendingBookings,
          completedBookings: completedBookings,
          cancelledBookings: cancelledBookings,
          averageRating: 4.5 // Placeholder
        });
        
        setRecentBookings(providerBookings.slice(0, 5));
        
      } else {
        // User dashboard data - filter bookings by user email
        const bookingsResponse = await fetch('https://dailyfix-server.vercel.app/bookings');
        const allBookings = await bookingsResponse.json();
        
        // Filter bookings for this user
        const userBookings = allBookings.filter(booking => 
          booking.userEmail === user.email
        );

        const totalBookings = userBookings.filter(b =>b.userEmail === user.email).length;
        const pendingBookings = userBookings.filter(b => b.status === 'pending').length;
        const completedBookings = userBookings.filter(b => b.status === 'completed').length;
        const cancelledBookings = userBookings.filter(b => b.status === 'cancelled').length;
        
        setStats({
          totalBookings: totalBookings,
          pendingBookings: pendingBookings,
          completedBookings: completedBookings,
          cancelledBookings: cancelledBookings,
        });
        
        setRecentBookings(userBookings.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatCards = () => {
    if (isAdmin()) {
      return [
        {
          title: 'Total Users',
          value: stats.totalUsers,
          icon: Users,
          description: 'Registered users',
          color: 'text-blue-600'
        },
        {
          title: 'Total Services',
          value: stats.totalServices,
          icon: Star,
          description: 'Available services',
          color: 'text-green-600'
        },
        {
          title: 'Total Bookings',
          value: stats.totalBookings,
          icon: Calendar,
          description: 'All bookings',
          color: 'text-purple-600'
        },
        {
          title: 'Total Revenue',
          value: `$${stats.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          description: 'Platform revenue',
          color: 'text-yellow-600'
        }
      ];
    } else if (isProvider()) {
      return [
        {
          title: 'My Services',
          value: stats.totalServices,
          icon: Star,
          description: 'Active services',
          color: 'text-blue-600'
        },
        {
          title: 'Total Bookings',
          value: stats.totalBookings,
          icon: Calendar,
          description: 'All bookings',
          color: 'text-green-600'
        },
        {
          title: 'Revenue',
          value: `$${stats.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          description: 'Total earnings',
          color: 'text-purple-600'
        },
        {
          title: 'Average Rating',
          value: stats.averageRating.toFixed(1),
          icon: TrendingUp,
          description: 'Service rating',
          color: 'text-yellow-600'
        }
      ];
    } else {
      return [
        {
          title: 'Total Bookings',
          value: stats.totalBookings,
          icon: Calendar,
          description: 'All bookings',
          color: 'text-blue-600'
        },
        {
          title: 'Completed',
          value: stats.completedBookings,
          icon: CheckCircle,
          description: 'Completed services',
          color: 'text-green-600'
        },
        {
          title: 'Pending',
          value: stats.pendingBookings,
          icon: Clock,
          description: 'Awaiting confirmation',
          color: 'text-yellow-600'
        },
        {
          title: 'Cancelled',
          value: stats.cancelledBookings,
          icon: XCircle,
          description: 'Cancelled bookings',
          color: 'text-red-600'
        }
      ];
    }
  };

  const bookingStatusData = {
    labels: ['Pending', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [stats.pendingBookings, stats.completedBookings, stats.cancelledBookings],
        backgroundColor: [
          'rgba(255, 206, 84, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(255, 206, 84, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userProfile?.name || user.displayName}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your {userProfile?.role === 'admin' ? 'platform' : 'account'} today.
          </p>
        </div>
        
        {(isProvider() || isAdmin()) && (
          <Button asChild>
            <Link to="/dashboard/add-service">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getStatCards().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="min-w-0"
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium truncate">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color} flex-shrink-0`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold truncate" title={stat.value}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground truncate">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Line 
              data={monthlyData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut 
              data={bookingStatusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Your latest booking activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={booking._id || index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.serviceName || booking.service || 'Service'}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.customerName || booking.customerEmail || booking.providerName || 'Customer'}
                      </p>
                      {booking.scheduledDate && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.price || '0'}</p>
                    <p className={`text-sm ${
                      booking.status === 'completed' ? 'text-green-600' :
                      booking.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {booking.status || 'pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recent bookings</p>
              <Button asChild className="mt-4">
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;