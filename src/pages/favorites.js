import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/AuthContext';

// Resolve API base: try env, then localhost (when on localhost), then deployed
const resolveApiBases = () => {
  const bases = [];
  if (process.env.NEXT_PUBLIC_API_URL) bases.push(process.env.NEXT_PUBLIC_API_URL);
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    bases.push('http://localhost:8080');
  }
  bases.push('https://venuity-backend.onrender.com');
  // Deduplicate while preserving order
  return Array.from(new Set(bases));
};

const SORT_OPTIONS = [
  { key: 'price', label: 'Price' },
  { key: 'rating', label: 'Rating' },
  { key: 'distance', label: 'Distance' }
];

const CATEGORY_TABS = [
  { key: 'all', label: 'All' },
  { key: 'venue', label: 'Venues' },
  { key: 'service', label: 'Services' }
];

const STORAGE_KEY = 'favorites-cache-v1';

const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-xl p-4 animate-pulse bg-white">
    <div className="h-40 w-full bg-gray-200 rounded-lg mb-3" />
    <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
    <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
    <div className="flex gap-2">
      <div className="h-8 w-20 bg-gray-200 rounded" />
      <div className="h-8 w-20 bg-gray-200 rounded" />
    </div>
  </div>
);

const FavoriteCard = ({
  item,
  onToggle,
  onShare,
  collection,
  isFavorited,
  onNavigate,
}) => (
  <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-green-700">
    <div className="relative h-44 w-full">
      <Image
        src={item.image || '/images/default-venue.jpg'}
        alt={item.name || 'Favorite item'}
        layout="fill"
        objectFit="cover"
        priority={false}
      />
    </div>
    <div className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{item.name || 'Untitled'}</h3>
          <p className="text-sm text-gray-600">
            {item.location || item.address || 'Location not available'}
          </p>
        </div>
        <button
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`text-sm px-3 py-2 rounded-lg border ${isFavorited ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'}`}
          onClick={() => onToggle(item)}
        >
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-700">
        {item.price && <span>Price: {item.price}</span>}
        {item.rating && (
          <span className="flex items-center gap-1">
            ⭐ {Number(item.rating).toFixed(1)}
          </span>
        )}
        {item.distance && <span>{item.distance} km away</span>}
        {collection && <span className="px-2 py-1 text-xs bg-gray-100 rounded">{collection}</span>}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          className="px-3 py-2 text-sm rounded-lg bg-green-700 text-white"
          onClick={() => onNavigate(item)}
        >
          View
        </button>
        <button
          className="px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-800"
          onClick={() => onShare(item)}
        >
          Share
        </button>
      </div>
    </div>
  </div>
);

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const apiBases = useMemo(() => resolveApiBases(), []);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [collections, setCollections] = useState(['All']);
  const [activeCollection, setActiveCollection] = useState('All');
  const [hasMore, setHasMore] = useState(true);
  const [pageSize] = useState(8);
  const [visibleCount, setVisibleCount] = useState(8);

  const slideshowIndex = useRef(0);
  const [slideshowItem, setSlideshowItem] = useState(null);

  const cacheFavorites = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to cache favorites', e);
    }
  };

  const loadFromCache = () => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setFavorites(parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to read favorites cache', e);
    }
    return [];
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to view favorites');
      router.push('/login');
      return;
    }
    const cached = loadFromCache();
    if (cached.length > 0) {
      setLoading(false);
    }
    fetchFavorites();
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
  try {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('You must be logged in to load favorites.');
      setLoading(false);
      return;
    }

    console.log('Fetching favorites...');
    const apiBase = resolveApiBases()[0]; // Get the first available base URL
    console.log('Using API base:', apiBase);
    const response = await axios.get(`${apiBase}/api/favorites`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Favorites response:', response.data);
    
    // Handle the response format from the backend
    const responseData = response.data.data || [];
    
    if (!Array.isArray(responseData)) {
      throw new Error('Invalid response format from server');
    }

    const favorites = responseData.map(item => ({
      ...item,
      // Ensure all required fields have default values
      name: item.name || 'Untitled',
      description: item.description || '',
      price: item.price || 0,
      rating: item.rating || 0,
      images: Array.isArray(item.images) ? item.images : [],
      location: item.location || 'Location not specified'
    }));

    setFavorites(favorites);
    cacheFavorites(favorites);
    setCollections(['All', ...new Set(favorites.map(i => i.collection).filter(Boolean))]);
    setHasMore(favorites.length > pageSize);
    setVisibleCount(Math.min(pageSize, favorites.length));
    
  } catch (err) {
    console.error('Error fetching favorites:', err);
    
    // More specific error messages
    if (err.response) {
      if (err.response.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else if (err.response.status === 404) {
        setError('Favorites endpoint not found. Please try again later.');
      } else {
        setError(`Error: ${err.response.data?.message || 'Failed to load favorites'}`);
      }
    } else if (err.request) {
      setError('Unable to connect to the server. Please check your internet connection.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }

    // Fall back to cached data
    const cached = loadFromCache();
    if (cached && cached.length > 0) {
      setFavorites(cached);
      setHasMore(cached.length > pageSize);
      setVisibleCount(Math.min(pageSize, cached.length));
    }
  } finally {
    setLoading(false);
  }
};

  const toggleFavorite = async (item) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to save favorites');
      return { success: false, error: 'Not authenticated' };
    }

    const apiBases = resolveApiBases();
    let lastError = null;
    
    for (const base of apiBases) {
      try {
        const response = await axios.post(
          `${base}/api/favorites/toggle/${item._id}`,
          { type: item.type || 'Venue' }, // Make sure to send the correct type
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data) {
          // Update the local state
          setFavorites(prevFavorites => {
            if (response.data.data.isFavorite) {
              // Add to favorites
              return [...prevFavorites, {
                ...response.data.data.item,
                _id: item._id,
                favoriteId: response.data.data.favoriteId
              }];
            } else {
              // Remove from favorites
              return prevFavorites.filter(fav => fav._id !== item._id);
            }
          });
          
          toast.success(
            response.data.data.isFavorite 
              ? 'Added to favorites' 
              : 'Removed from favorites'
          );
          
          return response.data;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Failed to toggle favorite with ${base}`, err);
      }
    }
    
    throw lastError || new Error('Failed to toggle favorite on all endpoints');
    
  } catch (err) {
    console.error('Error toggling favorite:', err);
    toast.error('Failed to update favorites. Please try again.');
    throw err;
  }
};

  const handleToggle = (item) => {
    toggleFavoriteApi(item);
  };

  const handleShare = async (item) => {
    const text = `Check this out: ${item.name} - ${item.location || ''}`;
    if (navigator.share) {
      await navigator.share({ title: 'Favorite', text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard');
    }
  };

  const handleNavigate = (item) => {
    if (item.type === 'service') {
      router.push(`/services/${item.slug || item._id}`);
    } else {
      router.push(`/venues/${item.slug || item._id}`);
    }
  };

  const filteredFavorites = useMemo(() => {
    let items = [...favorites];
    if (activeCategory !== 'all') {
      items = items.filter((i) => i.type === activeCategory);
    }
    if (activeCollection !== 'All') {
      items = items.filter((i) => i.collection === activeCollection);
    }
    items.sort((a, b) => {
      if (sortBy === 'price') return (a.priceValue || 0) - (b.priceValue || 0);
      if (sortBy === 'distance') return (a.distance || 0) - (b.distance || 0);
      return (b.rating || 0) - (a.rating || 0);
    });
    return items;
  }, [favorites, activeCategory, sortBy, activeCollection]);

  useEffect(() => {
    if (!showFavorites || filteredFavorites.length === 0) return;
    const interval = setInterval(() => {
      slideshowIndex.current = (slideshowIndex.current + 1) % filteredFavorites.length;
      setSlideshowItem(filteredFavorites[slideshowIndex.current]);
    }, 4000);
    setSlideshowItem(filteredFavorites[0]);
    return () => clearInterval(interval);
  }, [showFavorites, filteredFavorites]);

  const handleLoadMore = () => {
    const nextCount = visibleCount + pageSize;
    setVisibleCount(nextCount);
    setHasMore(nextCount < filteredFavorites.length);
  };

  return (
    <Layout title="Favorites - Venuity">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Favorites</h1>
            <p className="text-gray-600">Quickly access your saved venues and services.</p>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg border ${showFavorites ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-800 border-gray-200'}`}
              onClick={() => setShowFavorites((s) => !s)}
            >
              {showFavorites ? 'Hide Slideshow' : 'Show Slideshow'}
            </button>
            <button
              className="px-4 py-2 rounded-lg border bg-white text-gray-800"
              onClick={fetchFavorites}
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchFavorites} className="underline">
              Retry
            </button>
          </div>
        )}

        <div className="bg-white border rounded-xl p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-4 py-2 rounded-full text-sm border ${activeCategory === tab.key ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Collection:</span>
              <select
                value={activeCollection}
                onChange={(e) => setActiveCollection(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                {collections.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {showFavorites && slideshowItem && (
          <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="relative h-64 w-full">
              <Image
                src={slideshowItem.image || '/images/default-venue.jpg'}
                alt={slideshowItem.name || 'Favorite'}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs mb-1 uppercase tracking-wide">{slideshowItem.type}</p>
                <h3 className="text-2xl font-bold">{slideshowItem.name}</h3>
                <p className="text-sm">{slideshowItem.location || 'Location not available'}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-12 bg-white border border-dashed rounded-xl">
            <p className="text-gray-600 mb-3">No favorites yet.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push('/venues')}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
              >
                Browse venues
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredFavorites.slice(0, visibleCount).map((item) => (
                <FavoriteCard
                  key={item._id}
                  item={item}
                  onToggle={handleToggle}
                  onShare={handleShare}
                  collection={item.collection}
                  isFavorited
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

