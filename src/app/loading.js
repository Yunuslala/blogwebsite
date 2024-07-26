export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading, please wait...</p>
          </div>
        </div>
      );
  }