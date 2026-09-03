function CourseTable({
  courses,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Código</th>
            <th className="text-left p-4">Curso</th>
            <th className="text-left p-4">Capacidad</th>
            <th className="text-center p-4">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {courses.map((course) => (
            <tr
              key={course.id}
              className="border-t"
            >
              <td className="p-4">
                {course.code}
              </td>

              <td className="p-4">
                {course.name}
              </td>

              <td className="p-4">
                {course.max_capacity}
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onEdit(course)}
                  className="text-blue-600 mr-3"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(course)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default CourseTable;