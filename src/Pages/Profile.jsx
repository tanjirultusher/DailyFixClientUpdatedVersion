import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Shield, 
  Star,
  Activity,
  Settings,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';

function Profile() {
  const { user, userProfile, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updating, setUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showImagePreview, setShowImagePreview] = useState(false);

  useEffect(() => {
    document.title = (userData?.name || user?.displayName || "User") + " - Profile | DailyFix";
  }, [user, userData]);

  useEffect(() => {
    if (user?.uid) {
      fetch(`https://dailyfix-server.vercel.app/users/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user data:", data);
          setUserData(data);
          setUpdatedName(data.name || user?.displayName || "");
          setUpdatedImage(data.image || "");
          setUpdatedPhone(data.phone || "");
          setUpdatedLocation(data.location || "");
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          // Fallback to Firebase user data
          setUserData({
            name: user?.displayName || "",
            email: user?.email || "",
            image: user?.photoURL || "",
            uid: user?.uid || "",
            role: userProfile?.role || "user"
          });
          setUpdatedName(user?.displayName || "");
          setUpdatedImage(user?.photoURL || "");
        });
    }
  }, [user, userProfile]);

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`https://dailyfix-server.vercel.app/users/${user.uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedName,
          image: updatedImage,
          phone: updatedPhone,
          location: updatedLocation,
        }),
      });
      
      if (response.ok) {
        setUserData((prev) => ({ 
          ...prev, 
          name: updatedName, 
          image: updatedImage,
          phone: updatedPhone,
          location: updatedLocation
        }));
        setEditMode(false);
        setImageError(false);
        setImageLoading(true);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setUpdating(false);
    }
  };

  // Enhanced image source with fallback logic
  const getImageSource = () => {
    if (editMode && updatedImage) {
      return updatedImage;
    }
    
    // Priority: Database image → Firebase photoURL → Default avatar
    return userData?.image || user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const ProfileImage = () => {
    const imageSource = getImageSource();
    
    return (
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse rounded-full">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          
          {imageError || !imageSource ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
          ) : (
            <img
              src={imageSource}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          )}
        </div>
        
        {editMode && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="h-6 w-6 text-white" />
          </div>
        )}
        
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <Activity className="h-3 w-3 text-white" />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userData && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Unable to load profile data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
              <CardHeader className="relative text-center pb-2">
                <div className="flex justify-center mb-4">
                  <ProfileImage />
                </div>
                
                {editMode ? (
                  <div className="space-y-3">
                    <Input
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      placeholder="Enter your name"
                      className="text-center"
                    />
                    <div className="relative">
                      <Input
                        value={updatedImage}
                        onChange={(e) => {
                          setUpdatedImage(e.target.value);
                          setImageError(false);
                          setImageLoading(true);
                        }}
                        placeholder="Enter image URL"
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowImagePreview(!showImagePreview)}
                      >
                        {showImagePreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {showImagePreview && updatedImage && (
                      <div className="p-2 border rounded-lg bg-muted/50">
                        <img
                          src={updatedImage}
                          alt="Preview"
                          className="w-16 h-16 rounded-full mx-auto object-cover"
                          onError={() => setImageError(true)}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-2xl">{userData?.name || user?.displayName || "User"}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      {userData?.email || user?.email}
                    </CardDescription>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {userData?.role || userProfile?.role || "User"}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-green-500" />
                        Online
                      </Badge>
                    </div>
                  </>
                )}
              </CardHeader>
              
              <CardContent className="relative pt-4">
                <div className="flex justify-center gap-2">
                  {editMode ? (
                    <>
                      <Button
                        onClick={handleUpdateProfile}
                        disabled={updating}
                        className="flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        {updating ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(false);
                          setUpdatedName(userData?.name || "");
                          setUpdatedImage(userData?.image || "");
                          setUpdatedPhone(userData?.phone || "");
                          setUpdatedLocation(userData?.location || "");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    {editMode ? (
                      <Input
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-md">
                        {userData?.name || user?.displayName || "Not set"}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {userData?.email || user?.email}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    {editMode ? (
                      <Input
                        value={updatedPhone}
                        onChange={(e) => setUpdatedPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {userData?.phone || "Not set"}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    {editMode ? (
                      <Input
                        value={updatedLocation}
                        onChange={(e) => setUpdatedLocation(e.target.value)}
                        placeholder="Enter your location"
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {userData?.location || "Not set"}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Details
                </CardTitle>
                <CardDescription>Your account status and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User ID</label>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {userData?.uid || user?.uid}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Role</label>
                    <div className="p-3 bg-muted rounded-md">
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        <Shield className="h-3 w-3" />
                        {userData?.role || userProfile?.role || "User"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Member Since</label>
                    <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {userData?.createdAt ? 
                        new Date(userData.createdAt).toLocaleDateString() : 
                        "Recently joined"
                      }
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Status</label>
                    <div className="p-3 bg-muted rounded-md">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit text-green-600 border-green-600">
                        <Activity className="h-3 w-3" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;