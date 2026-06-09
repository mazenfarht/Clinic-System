export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] p-6 animate-pulse">
      {/* HEADER */}
      <div className="bg-[#1A2B45] p-4 rounded-xl mb-6 flex justify-between items-center">
        <div className="h-5 w-40 bg-white/20 rounded"></div>

        <div className="text-right space-y-2">
          <div className="h-3 w-32 bg-white/20 rounded"></div>
          <div className="h-5 w-20 bg-white/20 rounded"></div>
        </div>
      </div>

      {/* NOW SERVING CARD */}
      <div className="bg-white border-l-4 border-[#1A6BCC] rounded-xl p-6 mb-6 space-y-4">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-12 w-40 bg-gray-200 rounded"></div>
        <div className="h-5 w-56 bg-gray-200 rounded"></div>
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* FULL QUEUE HEADER */}
      <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>

      {/* QUEUE LIST */}
      <div className="bg-white border border-[#E2E8EF] rounded-xl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 border-b border-[#F0F3F7]"
          >
            <div className="space-y-2">
              <div className="h-3 w-10 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
