import React, { useEffect, useState } from 'react';

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues`);
        if (!res.ok) throw new Error('Failed to fetch venues');
        const data = await res.json();
        console.log('API response:', data);

        let venuesArray = [];
        if (Array.isArray(data)) {
          venuesArray = data;
        } else if (data && Array.isArray(data.venues)) {
          venuesArray = data.venues;
        } else if (data && Array.isArray(data.data)) {
          venuesArray = data.data;
        } else {
          console.warn('Unexpected API format:', data);
        }

        setVenues(Array.isArray(venuesArray) ? venuesArray : []);
      } catch (err) {
        setError(err.message || 'Error loading venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Venues</h1>
      {loading && <p>Loading venues...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && venues.length === 0 && (
        <p>No venues available or data format is invalid.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(venues) &&
          venues.map((venue) => (
            <div key={venue._id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold">{venue.name}</h2>
              <p>{venue.location?.city}, {venue.location?.state}</p>
              <p>Capacity: {venue.capacity}</p>
              <p>Price: ${venue.price}</p>
              <a
                href={`/venues/${venue._id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Details
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VenuesPage;
