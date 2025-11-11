export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
