export default function EventItemSkeleton() {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors animate-pulse">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-gray-200 rounded-md p-3 h-12 w-12" />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}