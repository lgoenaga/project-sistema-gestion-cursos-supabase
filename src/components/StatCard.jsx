function StatCard({
  title,
  value,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <span
        className={`
          inline-block
          px-3
          py-2
          rounded-lg
          text-sm
          font-medium
          ${colors[color]}
        `}
      >
        {title}
      </span>

      <h2 className="text-4xl font-bold mt-4">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;