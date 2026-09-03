function EnrollmentTable({
  enrollments,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">
              Estudiante
            </th>

            <th className="text-left p-4">
              Curso
            </th>

            <th className="text-left p-4">
              Fecha
            </th>

            <th className="text-left p-4">
              Estado
            </th>

            <th className="text-center p-4">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>

          {enrollments.map(
            (enrollment) => (
              <tr
                key={enrollment.id}
                className="border-t"
              >
                <td className="p-4">
                  {enrollment.students
                    ?.first_name}{" "}
                  {enrollment.students
                    ?.last_name}
                </td>

                <td className="p-4">
                  {
                    enrollment.courses
                      ?.name
                  }
                </td>

                <td className="p-4">
                  {
                    enrollment.enrollment_date
                  }
                </td>

                <td className="p-4">
                  {enrollment.status}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onEdit(enrollment)}
                    className="text-blue-600 mr-3"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(enrollment)}
                    className="text-red-600"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>
    </div>
  );
}

export default EnrollmentTable;