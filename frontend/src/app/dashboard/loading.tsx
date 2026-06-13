export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] p-6 space-y-6 animate-pulse">
      {/* NOW SERVING CARD */}
      <div className="relative bg-white border-l-4 border-[#1A6BCC] rounded-xl p-6 space-y-4">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>

        <div className="h-14 w-32 bg-gray-200 rounded"></div>

        <div className="h-5 w-56 bg-gray-200 rounded"></div>

        <div className="h-3 w-40 bg-gray-200 rounded"></div>

        {/* button skeleton */}
        <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>

        {/* date box */}
        <div className="absolute top-4 right-4 h-8 w-32 bg-gray-200 rounded-lg"></div>
      </div>

      {/* QUEUE TITLE */}
      <div className="h-6 w-32 bg-gray-200 rounded"></div>

      {/* TABLE HEADER */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div>
        </div>

        {/* ROWS */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border-b border-gray-100"
          >
            <div className="flex gap-4 items-center">
              <div className="h-4 w-10 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>

            <div className="h-8 w-20 bg-gray-200 rounded ml-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
