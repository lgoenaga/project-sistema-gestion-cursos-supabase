import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const STATUS_CONFIG = [
  { key: "active", label: "Activas", color: "#22c55e" },
  { key: "completed", label: "Completadas", color: "#3b82f6" },
  { key: "cancelled", label: "Canceladas", color: "#ef4444" },
];

function EnrollmentsByStatusChart({
  activeEnrollments,
  completedEnrollments,
  cancelledEnrollments,
}) {
  const counts = {
    active: activeEnrollments,
    completed: completedEnrollments,
    cancelled: cancelledEnrollments,
  };

  const total = STATUS_CONFIG.reduce(
    (sum, status) => sum + counts[status.key],
    0
  );

  const chartData = STATUS_CONFIG.map((status) => ({
    name: status.label,
    value: counts[status.key],
    color: status.color,
  })).filter((item) => item.value > 0);

  const getPercentage = (value) => {
    if (total === 0) return "0.0";
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">
        Matrículas por estado
      </h3>

      {total === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-500">
          No hay matrículas registradas
        </p>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center">
          <div className="h-52 w-52 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="w-full max-w-xs space-y-4">
            {STATUS_CONFIG.map((status) => (
              <li
                key={status.key}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-sm text-slate-600">{status.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {counts[status.key]}{" "}
                  <span className="font-normal text-slate-500">
                    ({getPercentage(counts[status.key])}%)
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EnrollmentsByStatusChart;
