import { Link } from "react-router-dom";

function StatCard({
  title,
  value,
  color = "blue",
  icon: Icon,
  linkTo,
  linkLabel,
}) {
  const colors = {
    blue: {
      icon: "bg-blue-100 text-blue-600",
      link: "text-blue-600 hover:text-blue-700",
    },
    green: {
      icon: "bg-green-100 text-green-600",
      link: "text-green-600 hover:text-green-700",
    },
    purple: {
      icon: "bg-purple-100 text-purple-600",
      link: "text-purple-600 hover:text-purple-700",
    },
  };

  const palette = colors[color] ?? colors.blue;

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm">
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${palette.icon}`}
      >
        {Icon && <Icon className="h-6 w-6" />}
      </div>

      <p className="mt-4 text-4xl font-bold text-slate-800">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{title}</p>

      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className={`mt-4 text-sm font-medium ${palette.link}`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export default StatCard;
