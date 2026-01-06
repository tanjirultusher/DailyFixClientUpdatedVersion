import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  Star,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
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

const Analytics = () => {
  const { isAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageBookingValue: 0,
    usersByRole: { users: 0, providers: 0, admins: 0 },
    bookingsByStatus: { pending: 0, completed: 0, cancelled: 0 },
    monthlyRevenue: [],
    monthlyBookings: [],
    topServices: []
  });

  useEffect(() => {
    document.title = 'Analytics - DailyFix';
    if (isAdmin()) {
      fetchAnalyticsData();
    }
  }, [isAdmin]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch users and bookings data
      const [usersResponse, bookingsResponse] = await Promise.all([
        fetch('https://dailyfix-server.vercel.app/users'),
        fetch('https://dailyfix-server.vercel.app/bookings')
      ]);
      
      const users = await usersResponse.json();
      const bookings = await bookingsResponse.json();
      
      // Calculate analytics
      const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);
      const averageBookingValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;
      
      // Users by role
      const usersByRole = {
        users: users.filter(u => u.role === 'user' || !u.role).length,
        providers: users.filter(u => u.role === 'provider').length,
        admins: users.filter(u => u.role === 'admin').length
      };
      
      // Bookings by status
      const bookingsByStatus = {
        pending: bookings.filter(b => b.status === 'pending').length,
        completed: bookings.filter(b => b.status === 'completed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
      };
      
      // Monthly data (last 6 months)
      const monthlyData = generateMonthlyData(bookings);
      
      // Top services (mock data since we don't have services API)
      const topServices = [
        { name: 'Home Cleaning', bookings: 45, revenue: 2250 },
        { name: 'Plumbing', bookings: 32, revenue: 1920 },
        { name: 'Electrical', bookings: 28, revenue: 1680 },
        { name: 'Gardening', bookings: 22, revenue: 1100 },
        { name: 'Painting', bookings: 18, revenue: 1440 }
      ];
      
      setAnalyticsData({
        totalUsers: users.length,
        totalBookings: bookings.length,
        totalRevenue: totalRevenue,
        averageBookingValue: averageBookingValue,
        usersByRole,
        bookingsByStatus,
        monthlyRevenue: monthlyData.revenue,
        monthlyBookings: monthlyData.bookings,
        topServices
      });
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMonthlyData = (bookings) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyRevenue = [1200, 1900, 800, 1500, 2200, 1800];
    const monthlyBookings = [12, 19, 8, 15, 22, 18];
    
    return { revenue: monthlyRevenue, bookings: monthlyBookings };
  };

  // Chart configurations
  const userRoleData = {
    labels: ['Users', 'Providers', 'Admins'],
    datasets: [
      {
        data: [
          analyticsData.usersByRole.users,
          analyticsData.usersByRole.providers,
          analyticsData.usersByRole.admins
        ],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const bookingStatusData = {
    labels: ['Pending', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [
          analyticsData.bookingsByStatus.pending,
          analyticsData.bookingsByStatus.completed,
          analyticsData.bookingsByStatus.cancelled
        ],
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

  const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: analyticsData.monthlyRevenue,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const monthlyBookingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: analyticsData.monthlyBookings,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (!isAdmin()) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive platform analytics and insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Total Revenue',
            value: formatCurrency(analyticsData.totalRevenue),
            icon: DollarSign,
            color: 'text-green-600',
            description: 'Platform revenue'
          },
          {
            title: 'Total Bookings',
            value: analyticsData.totalBookings,
            icon: Calendar,
            color: 'text-blue-600',
            description: 'All bookings'
          },
          {
            title: 'Total Users',
            value: analyticsData.totalUsers,
            icon: Users,
            color: 'text-purple-600',
            description: 'Registered users'
          },
          {
            title: 'Avg Booking Value',
            value: formatCurrency(analyticsData.averageBookingValue),
            icon: TrendingUp,
            color: 'text-orange-600',
            description: 'Per booking'
          }
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold truncate">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
            <CardDescription>Distribution of user roles on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Pie 
              data={userRoleData}
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

        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>Current status of all bookings</CardDescription>
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

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <Line 
              data={monthlyRevenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
            <CardDescription>Booking volume over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar 
              data={monthlyBookingsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Top Services */}
      <Card>
        <CardHeader>
          <CardTitle>Top Services</CardTitle>
          <CardDescription>Most popular services by bookings and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topServices.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${service.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;