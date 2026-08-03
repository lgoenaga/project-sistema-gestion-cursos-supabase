function PopularCoursesCard({ courses = [] }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Cursos populares</h3>

      {courses.length === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-500">
          No hay cursos con matrículas
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {courses.map((course) => (
            <li
              key={course.name}
              className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
            >
              <span className="text-sm font-medium text-slate-700">
                {course.name}
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {course.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopularCoursesCard;
