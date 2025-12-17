import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiBell, 
  FiMail, 
  FiCheckCircle, 
  FiStar, 
  FiRefreshCw,
  FiDollarSign,
  FiCreditCard,
  FiShield,
  FiLock,
  FiAlertCircle,
  FiGift,
  FiHome,
  FiSettings,
  FiX
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/utils/axios';

// Notification Toggle Component
const NotificationToggle = ({ icon, iconBg, title, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${iconBg} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

const Notifications = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    // Payment Notifications
    paymentReceived: true,
    paymentFailed: true,
    refundProcessed: true,
    subscriptionRenewal: true,
    // Booking Reminders
    upcomingBooking: true,
    checkinReminder: true,
    checkoutReminder: true,
    bookingConfirmation: true,
    bookingRequests: true,
    bookingStatus: true,
    // Account & Security
    passwordChange: true,
    newDeviceLogin: true,
    securityAlerts: true,
    // Promotional
    specialOffers: true,
    venueMatches: true,
    seasonalPromotions: true,
    // Venue Updates
    venuePolicyChanges: true,
    newAmenities: true,
    maintenanceNotifications: true,
    // Reviews
    newReviews: true
  });

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/notifications');
      // Backend returns { success: true, data: notifications }
      setNotifications(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
      setNotifications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Update notification settings
  const updateNotificationSettings = async (setting, value) => {
    try {
      const newSettings = { ...notificationSettings, [setting]: value };
      setNotificationSettings(newSettings);
      
      await api.put('/api/notifications/settings', {
        settings: newSettings
      });
      
      toast.success('Notification settings updated');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update notification settings');
      // Revert on error
      setNotificationSettings(prev => ({ ...prev, [setting]: !value }));
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(notif => 
        notif._id === notificationId ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Fetch notification settings
  const fetchNotificationSettings = async () => {
    try {
      const response = await api.get('/api/notifications/settings');
      if (response.data.success && response.data.data) {
        setNotificationSettings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error);
    }
  };

  // Delete all notifications
  const deleteAllNotifications = async () => {
    if (!confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete('/api/notifications');
      setNotifications([]);
      toast.success('All notifications deleted');
    } catch (error) {
      console.error('Error deleting all notifications:', error);
      toast.error('Failed to delete all notifications');
    }
  };

  // Fetch notifications and settings on component mount
  useEffect(() => {
    fetchNotifications();
    fetchNotificationSettings();
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
      case 'booking_confirmation':
      case 'booking_reminder':
      case 'checkin_reminder':
      case 'checkout_reminder':
        return <FiMail className="h-5 w-5 text-blue-500" />;
      case 'status':
      case 'bookingStatus':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'review':
      case 'newReviews':
        return <FiStar className="h-5 w-5 text-yellow-500" />;
      case 'payment':
      case 'payment_received':
      case 'payment_failed':
      case 'refund_processed':
      case 'subscription_renewal':
        return <FiDollarSign className="h-5 w-5 text-green-600" />;
      case 'password_change':
      case 'new_device_login':
      case 'security_alert':
        return <FiShield className="h-5 w-5 text-red-500" />;
      case 'promotional':
      case 'special_offer':
      case 'seasonal_promotion':
        return <FiGift className="h-5 w-5 text-purple-500" />;
      case 'venue_match':
      case 'venue_policy_change':
      case 'new_amenity':
      case 'maintenance':
        return <FiHome className="h-5 w-5 text-indigo-500" />;
      default:
        return <FiBell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          </div>
          <button
            onClick={fetchNotifications}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Refresh notifications"
          >
            <FiRefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage what notifications you receive</p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Payment Notifications */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Notifications</h3>
              <div className="space-y-4">
                <NotificationToggle 
                  icon={<FiDollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />}
                  iconBg="bg-green-100 dark:bg-green-900"
                  title="Payment Received"
                  description="Get notified when you receive a payment"
                  checked={notificationSettings.paymentReceived}
                  onChange={(checked) => updateNotificationSettings('paymentReceived', checked)}
                />
                <NotificationToggle 
                  icon={<FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />}
                  iconBg="bg-red-100 dark:bg-red-900"
                  title="Payment Failed"
                  description="Get notified when a payment fails"
                  checked={notificationSettings.paymentFailed}
                  onChange={(checked) => updateNotificationSettings('paymentFailed', checked)}
                />
                <NotificationToggle 
                  icon={<FiCreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />}
                  iconBg="bg-blue-100 dark:bg-blue-900"
                  title="Refund Processed"
                  description="Get notified when a refund is processed"
                  checked={notificationSettings.refundProcessed}
                  onChange={(checked) => updateNotificationSettings('refundProcessed', checked)}
                />
                <NotificationToggle 
                  icon={<FiRefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-300" />}
                  iconBg="bg-purple-100 dark:bg-purple-900"
                  title="Subscription Renewal"
                  description="Get reminders about subscription renewals"
                  checked={notificationSettings.subscriptionRenewal}
                  onChange={(checked) => updateNotificationSettings('subscriptionRenewal', checked)}
                />
              </div>
            </div>

            {/* Booking Reminders */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Booking Reminders</h3>
              <div className="space-y-4">
                <NotificationToggle 
                  icon={<FiMail className="h-5 w-5 text-blue-600 dark:text-blue-300" />}
                  iconBg="bg-blue-100 dark:bg-blue-900"
                  title="Upcoming Booking (24h before)"
                  description="Get reminded 24 hours before your booking"
                  checked={notificationSettings.upcomingBooking}
                  onChange={(checked) => updateNotificationSettings('upcomingBooking', checked)}
                />
                <NotificationToggle 
                  icon={<FiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />}
                  iconBg="bg-green-100 dark:bg-green-900"
                  title="Check-in Reminders"
                  description="Get notified about check-in times"
                  checked={notificationSettings.checkinReminder}
                  onChange={(checked) => updateNotificationSettings('checkinReminder', checked)}
                />
                <NotificationToggle 
                  icon={<FiCheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-300" />}
                  iconBg="bg-orange-100 dark:bg-orange-900"
                  title="Check-out Reminders"
                  description="Get notified about check-out times"
                  checked={notificationSettings.checkoutReminder}
                  onChange={(checked) => updateNotificationSettings('checkoutReminder', checked)}
                />
                <NotificationToggle 
                  icon={<FiMail className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />}
                  iconBg="bg-indigo-100 dark:bg-indigo-900"
                  title="Booking Confirmation"
                  description="Get notified when bookings are confirmed"
                  checked={notificationSettings.bookingConfirmation}
                  onChange={(checked) => updateNotificationSettings('bookingConfirmation', checked)}
                />
                <NotificationToggle 
                  icon={<FiMail className="h-5 w-5 text-blue-600 dark:text-blue-300" />}
                  iconBg="bg-blue-100 dark:bg-blue-900"
                  title="New Booking Requests"
                  description="Get notified when you receive a new booking request"
                  checked={notificationSettings.bookingRequests}
                  onChange={(checked) => updateNotificationSettings('bookingRequests', checked)}
                />
                <NotificationToggle 
                  icon={<FiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />}
                  iconBg="bg-green-100 dark:bg-green-900"
                  title="Booking Status Changes"
                  description="Get notified when there's a change in your booking status"
                  checked={notificationSettings.bookingStatus}
                  onChange={(checked) => updateNotificationSettings('bookingStatus', checked)}
                />
              </div>
            </div>

            {/* Account & Security */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Account & Security</h3>
              <div className="space-y-4">
                <NotificationToggle 
                  icon={<FiLock className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                  iconBg="bg-gray-100 dark:bg-gray-700"
                  title="Password Change Confirmation"
                  description="Get notified when your password is changed"
                  checked={notificationSettings.passwordChange}
                  onChange={(checked) => updateNotificationSettings('passwordChange', checked)}
                />
                <NotificationToggle 
                  icon={<FiShield className="h-5 w-5 text-blue-600 dark:text-blue-300" />}
                  iconBg="bg-blue-100 dark:bg-blue-900"
                  title="Login from New Device"
                  description="Get notified when someone logs in from a new device"
                  checked={notificationSettings.newDeviceLogin}
                  onChange={(checked) => updateNotificationSettings('newDeviceLogin', checked)}
                />
                <NotificationToggle 
                  icon={<FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />}
                  iconBg="bg-red-100 dark:bg-red-900"
                  title="Security Alerts"
                  description="Get notified about important security events"
                  checked={notificationSettings.securityAlerts}
                  onChange={(checked) => updateNotificationSettings('securityAlerts', checked)}
                />
              </div>
            </div>

            {/* Promotional */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Promotional</h3>
              <div className="space-y-4">
                <NotificationToggle 
                  icon={<FiGift className="h-5 w-5 text-purple-600 dark:text-purple-300" />}
                  iconBg="bg-purple-100 dark:bg-purple-900"
                  title="Special Offers & Discounts"
                  description="Get notified about special offers and discounts"
                  checked={notificationSettings.specialOffers}
                  onChange={(checked) => updateNotificationSettings('specialOffers', checked)}
                />
                <NotificationToggle 
                  icon={<FiHome className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />}
                  iconBg="bg-indigo-100 dark:bg-indigo-900"
                  title="New Venues Matching Preferences"
                  description="Get notified about new venues that match your preferences"
                  checked={notificationSettings.venueMatches}
                  onChange={(checked) => updateNotificationSettings('venueMatches', checked)}
                />
                <NotificationToggle 
                  icon={<FiGift className="h-5 w-5 text-pink-600 dark:text-pink-300" />}
                  iconBg="bg-pink-100 dark:bg-pink-900"
                  title="Seasonal Promotions"
                  description="Get notified about seasonal promotions and events"
                  checked={notificationSettings.seasonalPromotions}
                  onChange={(checked) => updateNotificationSettings('seasonalPromotions', checked)}
                />
              </div>
            </div>

            {/* Venue Updates */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Venue Updates</h3>
              <div className="space-y-4">
                <NotificationToggle 
                  icon={<FiSettings className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                  iconBg="bg-gray-100 dark:bg-gray-700"
                  title="Venue Policy Changes"
                  description="Get notified when venue policies change"
                  checked={notificationSettings.venuePolicyChanges}
                  onChange={(checked) => updateNotificationSettings('venuePolicyChanges', checked)}
                />
                <NotificationToggle 
                  icon={<FiHome className="h-5 w-5 text-green-600 dark:text-green-300" />}
                  iconBg="bg-green-100 dark:bg-green-900"
                  title="New Amenities Added"
                  description="Get notified when new amenities are added to venues"
                  checked={notificationSettings.newAmenities}
                  onChange={(checked) => updateNotificationSettings('newAmenities', checked)}
                />
                <NotificationToggle 
                  icon={<FiAlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-300" />}
                  iconBg="bg-orange-100 dark:bg-orange-900"
                  title="Maintenance Notifications"
                  description="Get notified about venue maintenance and updates"
                  checked={notificationSettings.maintenanceNotifications}
                  onChange={(checked) => updateNotificationSettings('maintenanceNotifications', checked)}
                />
              </div>
            </div>

            {/* Reviews */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Reviews</h3>
              <div className="space-y-4">
                <NotificationToggle 
                  icon={<FiStar className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />}
                  iconBg="bg-yellow-100 dark:bg-yellow-900"
                  title="New Reviews & Ratings"
                  description="Get notified when you receive a new review or rating"
                  checked={notificationSettings.newReviews}
                  onChange={(checked) => updateNotificationSettings('newReviews', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Notifications</h2>
            <div className="flex items-center space-x-3">
              {notifications.some(n => !n.read) && (
                <button
                  onClick={async () => {
                    try {
                      await api.patch('/api/notifications/read-all');
                      setNotifications(notifications.map(n => ({ ...n, read: true })));
                      toast.success('All notifications marked as read');
                    } catch (error) {
                      console.error('Error marking all as read:', error);
                      toast.error('Failed to mark all as read');
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={deleteAllNotifications}
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <FiX className="h-4 w-4 mr-1" />
                  Close All
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            ) : notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <motion.li 
                    key={notification._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => {
                      markAsRead(notification._id);
                      // Navigate based on notification type
                      if (notification.type === 'booking' && notification.bookingId) {
                        router.push(`/bookings/${notification.bookingId}`);
                      } else if (notification.type === 'review' && notification.venueId) {
                        router.push(`/venues/${notification.venueId}#reviews`);
                      }
                    }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        {getNotificationIcon(notification.type)}
                        {!notification.read && (
                          <span className="flex h-2 w-2 relative -top-6 left-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                          </span>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                          }`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        {notification.meta && (
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {Object.entries(notification.meta).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center">
                <FiBell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  We'll notify you when there's something new.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;