export default function SkeletonCard({
  rows = 3,
  height = "h-5",
  title = true,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">

      {title && (
        <div className="bg-gray-700 h-6 w-1/2 rounded mb-6"></div>
      )}

      {[...Array(rows)].map((_, index) => (
        <div
          key={index}
          className={`bg-gray-700 ${height} rounded mb-4`}
        ></div>
      ))}

    </div>
  );
}