import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { format, differenceInCalendarDays } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';

const resolveApiBase = () => {
  // Use explicit env if provided
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  // Default to deployed API to avoid localhost connection errors when backend isn't running locally
  return 'https://venuity-backend.onrender.com';
};

const statusTabs = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'pending', label: 'Pending Approval' }
];

const sortOptions = [
  { key: 'createdAt', label: 'Booking date' },
  { key: 'startDate', label: 'Check-in date' },
  { key: 'total', label: 'Price' }
];

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800'
};

const paymentColors = {
  paid: 'text-green-700 bg-green-50',
  pending: 'text-yellow-700 bg-yellow-50',
  refunded: 'text-blue-700 bg-blue-50',
  failed: 'text-red-700 bg-red-50'
};

const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-xl p-4 animate-pulse bg-white">
    <div className="flex justify-between mb-4">
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="h-6 w-20 bg-gray-200 rounded-full" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 h-32 bg-gray-200 rounded-lg" />
      <div className="col-span-2 space-y-3">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const getStatusBucket = (booking) => {
  if (booking.status === 'cancelled') return 'cancelled';
  if (booking.status === 'pending') return 'pending';
  if (new Date(booking.eventDetails?.endDate || booking.endDate) < new Date()) return 'past';
  return 'upcoming';
};

const formatMoney = (amount = 0) => `$${Number(amount).toLocaleString()}`;

export default function BookingsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const apiBase = useMemo(() => resolveApiBase(), []);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sortBy, setSortBy] = useState('createdAt');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to view your bookings');
      router.push('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const params = {};
      if (dateRange.start) params.startDate = dateRange.start;
      if (dateRange.end) params.endDate = dateRange.end;
      if (statusFilter !== 'all') params.status = statusFilter;

      const response = await axios.get(`${apiBase}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      setBookings(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${apiBase}/api/bookings/${bookingId}/status`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      console.error('Cancel booking failed', err);
      toast.error(err.response?.data?.error || 'Unable to cancel booking');
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Booking ID copied');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async (booking) => {
    const shareText = `Booking ${booking._id} at ${booking.venue?.businessName || 'Venue'} from ${format(new Date(booking.eventDetails?.startDate), 'MMM dd')} to ${format(new Date(booking.eventDetails?.endDate), 'MMM dd')}`;
    if (navigator.share) {
      await navigator.share({ title: 'My Booking', text: shareText });
    } else {
      handleCopy(shareText);
    }
  };

  const addToCalendar = (booking) => {
    const start = new Date(booking.eventDetails?.startDate);
    const end = new Date(booking.eventDetails?.endDate);
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${booking.venue?.businessName || 'Event Booking'}`,
      `DTSTART:${start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DESCRIPTION:Booking ID ${booking._id}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'booking.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtered = useMemo(() => {
    const now = new Date();
    return bookings
      .filter((booking) => getStatusBucket(booking) === activeTab)
      .filter((booking) => (typeFilter === 'all' ? true : booking.venue?.hostType === typeFilter))
      .filter((booking) => {
        if (!dateRange.start && !dateRange.end) return true;
        const start = new Date(booking.eventDetails?.startDate);
        const end = new Date(booking.eventDetails?.endDate);
        if (dateRange.start && start < new Date(dateRange.start)) return false;
        if (dateRange.end && end > new Date(dateRange.end)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'total') {
          return (b.payment?.totalAmount || 0) - (a.payment?.totalAmount || 0);
        }
        if (sortBy === 'startDate') {
          return new Date(a.eventDetails?.startDate) - new Date(b.eventDetails?.startDate);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [bookings, activeTab, typeFilter, dateRange, sortBy]);

  const renderActions = (booking) => {
    const bucket = getStatusBucket(booking);
    const actions = [];
    actions.push(
      <button
        key="details"
        onClick={() => router.push(`/bookings/${booking._id}`)}
        className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm"
      >
        View Details
      </button>
    );

    if (bucket === 'upcoming') {
      actions.push(
        <button
          key="cancel"
          onClick={() => handleCancel(booking._id)}
          className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm"
        >
          Cancel
        </button>
      );
      actions.push(
        <button
          key="reschedule"
          onClick={() => router.push(`/venues/${booking.venue?._id}?reschedule=${booking._id}`)}
          className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm"
        >
          Reschedule
        </button>
      );
    }

    if (bucket === 'past') {
      actions.push(
        <button
          key="review"
          onClick={() =>
            router.push(`/reviews/new?venueId=${booking.venue?._id}&bookingId=${booking._id}`)
          }
          className="px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm"
        >
          Leave Review
        </button>
      );
    }

    actions.push(
      <button
        key="invoice"
        onClick={() => toast.info('Invoice download coming soon')}
        className="px-3 py-2 rounded-lg bg-white border text-gray-800 text-sm"
      >
        Download Invoice
      </button>
    );

    return actions;
  };

  const EmptyState = () => (
    <div className="text-center py-12 bg-white border border-dashed rounded-xl">
      <p className="text-gray-600 mb-3">No bookings match your filters.</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => {
            setActiveTab('upcoming');
            setStatusFilter('all');
            setTypeFilter('all');
            setDateRange({ start: '', end: '' });
          }}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
        >
          Reset filters
        </button>
        <button
          onClick={() => router.push('/venues')}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
        >
          Browse venues
        </button>
      </div>
    </div>
  );

  const BookingCard = ({ booking }) => {
    const bucket = getStatusBucket(booking);
    const days = differenceInCalendarDays(
      new Date(booking.eventDetails?.endDate),
      new Date(booking.eventDetails?.startDate)
    );
    const isExpanded = expandedCard === booking._id;

    return (
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-40 bg-gray-100 flex-shrink-0">
            {booking.venue?.images?.length ? (
              <img
                src={booking.venue.images[0]}
                alt={booking.venue.businessName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
          </div>

          <div className="flex-1 p-4 space-y-3">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  Booking ID: {booking._id}
                  <button
                    onClick={() => handleCopy(booking._id)}
                    className="text-green-700 text-xs underline"
                  >
                    Copy
                  </button>
                </p>
                <h3 className="text-lg font-semibold">
                  {booking.venue?.businessName || 'Venue'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {booking.venue?.city || booking.venue?.address || 'Location not available'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status] || 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {booking.status || 'Pending'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColors[booking.payment?.status] || 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {booking.payment?.status ? `${booking.payment.status} payment` : 'Unpaid'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Dates</p>
                <p>
                  {format(new Date(booking.eventDetails?.startDate), 'MMM dd, yyyy')} &ndash;{' '}
                  {format(new Date(booking.eventDetails?.endDate), 'MMM dd, yyyy')}
                </p>
                <p className="text-xs text-gray-500">{days || 1} day(s)</p>
              </div>
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-semibold">
                  {formatMoney(booking.payment?.totalAmount || booking.totalAmount)}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-gray-500">Actions</div>
                <div className="flex flex-wrap gap-2">{renderActions(booking)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => addToCalendar(booking)}
                className="text-xs px-3 py-2 bg-gray-50 rounded-lg"
              >
                Add to calendar
              </button>
              <button
                onClick={() => handleShare(booking)}
                className="text-xs px-3 py-2 bg-gray-50 rounded-lg"
              >
                Share
              </button>
              <button
                onClick={() => toast.info('Invoice request sent')}
                className="text-xs px-3 py-2 bg-gray-50 rounded-lg"
              >
                Request invoice
              </button>
            </div>

            <button
              className="md:hidden text-sm text-green-700 underline"
              onClick={() => setExpandedCard(isExpanded ? null : booking._id)}
            >
              {isExpanded ? 'Hide details' : 'Show details'}
            </button>

            {isExpanded && (
              <div className="md:hidden text-sm text-gray-700 space-y-2">
                {booking.services?.length > 0 && (
                  <div>
                    <p className="text-gray-500">Services</p>
                    <ul className="list-disc list-inside">
                      {booking.services.map((svc) => (
                        <li key={svc._id || svc.serviceType}>
                          {svc.serviceType} &middot; {svc.serviceProvider?.businessName || 'Provider'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <p className="text-gray-600">Manage, filter, and track your bookings</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm border ${activeTab === tab.key ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Venue/Service type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All</option>
                <option value="venue">Venues</option>
                <option value="service">Services</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Start date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((r) => ({ ...r, start: e.target.value }))}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">End date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((r) => ({ ...r, end: e.target.value }))}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchBookings}
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
                setDateRange({ start: '', end: '' });
                setSortBy('createdAt');
                fetchBookings();
              }}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchBookings} className="underline">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

