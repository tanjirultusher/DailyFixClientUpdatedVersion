import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Search, 
  UserCheck, 
  UserX, 
  Shield,
  Mail,
  Trash2
} from 'lucide-react';

const UsersManagement = () => {
  const { isAdmin } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    providers: 0,
    admins: 0
  });

  useEffect(() => {
    document.title = 'Users Management - DailyFix';
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Fetch data directly from the provided API
        const response = await fetch('https://dailyfix-server.vercel.app/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        
        // Filter users based on search term and role
        let filteredUsers = data || [];
        
        if (searchTerm) {
          filteredUsers = filteredUsers.filter(user => 
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (filterRole !== 'all') {
          filteredUsers = filteredUsers.filter(user => user.role === filterRole);
        }
        
        // Pagination
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
        setUsers(paginatedUsers);
        setTotalPages(Math.ceil(filteredUsers.length / 10));
        
        // Calculate stats from all users (not just filtered)
        setStats({
          total: data.length || 0,
          active: data.filter(u => u.status !== 'inactive').length || data.length || 0, // Assume active if no status field
          providers: data.filter(u => u.role === 'provider').length || 0,
          admins: data.filter(u => u.role === 'admin').length || 0
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin()) {
      fetchUsers();
    }
  }, [searchTerm, filterRole, currentPage, isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch data directly from the provided API
      const response = await fetch('https://dailyfix-server.vercel.app/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      
      // Filter users based on search term and role
      let filteredUsers = data || [];
      
      if (searchTerm) {
        filteredUsers = filteredUsers.filter(user => 
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (filterRole !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.role === filterRole);
      }
      
      // Pagination
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
      
      setUsers(paginatedUsers);
      setTotalPages(Math.ceil(filteredUsers.length / 10));
      
      // Calculate stats from all users (not just filtered)
      setStats({
        total: data.length || 0,
        active: data.filter(u => u.status !== 'inactive').length || data.length || 0, // Assume active if no status field
        providers: data.filter(u => u.role === 'provider').length || 0,
        admins: data.filter(u => u.role === 'admin').length || 0
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const response = await fetch(`https://dailyfix-server.vercel.app/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleStatusToggle = async (userId) => {
    try {
      // Find the current user to get their current status
      const currentUser = users.find(u => u.uid === userId);
      const newStatus = currentUser?.status === 'inactive' ? 'active' : 'inactive';
      
      const response = await fetch(`https://dailyfix-server.vercel.app/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle user status');
      }
      
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://dailyfix-server.vercel.app/users/${userId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        
        // Refresh the users list
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'provider': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'inactive' 
      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  if (!isAdmin()) {
    return (
      <div className="text-center py-8">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">Manage all platform users and their roles</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Users', value: stats.total, icon: Users, color: 'text-blue-600' },
          { title: 'Active Users', value: stats.active, icon: UserCheck, color: 'text-green-600' },
          { title: 'Providers', value: stats.providers, icon: Shield, color: 'text-purple-600' },
          { title: 'Admins', value: stats.admins, icon: Shield, color: 'text-red-600' }
        ].map((stat) => {
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
          <CardTitle>User List</CardTitle>
          <CardDescription>Search and filter users by role and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="provider">Providers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-3 bg-muted rounded w-1/3"></div>
                  </div>
                  <div className="w-20 h-6 bg-muted rounded"></div>
                  <div className="w-16 h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user, index) => (
                <div
                  key={user.uid || index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{user.name || 'Unknown User'}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>ID: {user._id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role || 'user'}
                    </Badge>
                    <Badge className={getStatusBadgeColor(user.status)}>
                      {user.status || 'active'}
                    </Badge>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusToggle(user.uid)}
                        className="h-8 w-8 p-0"
                        title={user.status === 'inactive' ? 'Activate User' : 'Deactivate User'}
                      >
                        {user.status === 'inactive' ? (
                          <UserCheck className="h-4 w-4" />
                        ) : (
                          <UserX className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <select
                        value={user.role || 'user'}
                        onChange={(e) => handleRoleUpdate(user.uid, e.target.value)}
                        className="px-2 py-1 text-xs border border-input bg-background rounded"
                      >
                        <option value="user">User</option>
                        <option value="provider">Provider</option>
                        <option value="admin">Admin</option>
                      </select>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.uid)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found</p>
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

export default UsersManagement;