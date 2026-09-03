function StudentTable({
  students,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Nombre</th>
            <th className="text-left p-4">Apellido</th>
            <th className="text-left p-4">Correo</th>
            <th className="text-left p-4">Celular</th>
            <th className="text-center p-4">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr
              key={student.id}
              className="border-t"
            >
              <td className="p-4">
                {student.first_name}
              </td>

              <td className="p-4">
                {student.last_name}
              </td>

              <td className="p-4">
                {student.email}
              </td>

              <td className="p-4">
                {student.phone}
              </td>

              <td className="p-4 text-center space-x-2">

                <button
                  onClick={() => onEdit(student)}
                  className="text-blue-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(student)}
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

export default StudentTable;