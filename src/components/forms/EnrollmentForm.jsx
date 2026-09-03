import PrimaryButton from "../ui/PrimaryButton";
import { useFormState } from "../../hooks/useFormState";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";

function EnrollmentForm({ isOpen, onClose, onSave, students, courses }) {
  const { formData, handleChange } = useFormState({
    student_id: "",
    course_id: "",
    status: "ACTIVE",
    enrollment_date: new Date().toISOString().split("T")[0],
  });
  const modalRef = useModalAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Nueva Matrícula</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Seleccione estudiante</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </select>

          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Seleccione curso</option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="ACTIVE">ACTIVE</option>

            <option value="COMPLETED">COMPLETED</option>

            <option value="CANCELLED">CANCELLED</option>
          </select>

          <input
            type="date"
            name="enrollment_date"
            value={formData.enrollment_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancelar
            </button>

            <PrimaryButton type="submit">Guardar</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnrollmentForm;
