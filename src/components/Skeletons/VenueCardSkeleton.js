export default function VenueCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}