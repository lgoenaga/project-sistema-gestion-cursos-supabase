import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";
import PrimaryButton from "../components/ui/PrimaryButton";
import EmptyState from "../components/ui/EmptyState";
import EnrollmentTable from "../components/tables/EnrollmentTable";
import EnrollmentForm from "../components/forms/EnrollmentForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { useModalAccessibility } from "../hooks/useModalAccessibility";

import {
  getEnrollments,
  getStudentOptions,
  getCourseOptions,
  getEnrollmentByStudentAndCourse,
  getCourseEnrollmentCount,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
} from "../services/enrollmentService";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const [enrollmentToDelete, setEnrollmentToDelete] = useState(null);

  const [enrollmentToSave, setEnrollmentToSave] = useState(null);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const student = `${enrollment.students?.first_name} ${enrollment.students?.last_name}`;

    const course = enrollment.courses?.name || "";

    const matchSearch =
      student.toLowerCase().includes(search.toLowerCase()) ||
      course.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "ALL" || enrollment.status === statusFilter;

    return matchSearch && matchStatus;
  });

  useEffect(() => {
    loadEnrollments();
    loadOptions();
  }, []);

  async function loadEnrollments() {
    try {
      const data = await getEnrollments();

      setEnrollments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadOptions() {
    const studentsData = await getStudentOptions();

    const coursesData = await getCourseOptions();

    setStudents(studentsData);
    setCourses(coursesData);
  }

  async function handleSave(formData) {
    setEnrollmentToSave(formData);
  }

  async function confirmSave() {
    try {
      const duplicated = await getEnrollmentByStudentAndCourse(
        enrollmentToSave.student_id,
        enrollmentToSave.course_id,
      );

      if (duplicated.length > 0) {
        alert("El estudiante ya se encuentra matriculado en este curso.");
        setEnrollmentToSave(null);
        return;
      }

      const selectedCourse = courses.find(
        (course) => course.id === enrollmentToSave.course_id,
      );

      const currentEnrollments = await getCourseEnrollmentCount(
        enrollmentToSave.course_id,
      );

      if (currentEnrollments >= selectedCourse.max_capacity) {
        alert("El curso ha alcanzado su capacidad máxima.");
        setEnrollmentToSave(null);
        return;
      }

      await createEnrollment(enrollmentToSave);

      await loadEnrollments();

      setEnrollmentToSave(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      alert("Ocurrió un error al registrar la matrícula.");
    }
  }

  function handleEdit(enrollment) {
    setSelectedEnrollment(enrollment);
  }

  function closeStatusModal() {
    setSelectedEnrollment(null);
  }

  const statusModalRef = useModalAccessibility(
    !!selectedEnrollment,
    closeStatusModal,
  );

  function handleCancelForm() {
    setShowCancelConfirm(true);
  }

  function confirmCancelForm() {
    setShowCancelConfirm(false);
    setIsModalOpen(false);
  }

  function handleDelete(enrollment) {
    setEnrollmentToDelete(enrollment);
  }

  async function confirmDelete() {
    try {
      await deleteEnrollment(enrollmentToDelete.id);

      await loadEnrollments();

      setEnrollmentToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle
          title="Matrículas"
          subtitle="Gestión de matrículas registradas"
        />
        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          Nueva Matrícula
        </PrimaryButton>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar estudiante o curso..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-white
            rounded-lg
            border
            p-3
            mb-6
          "
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
          bg-white
          border
          rounded-lg
          p-3
          mb-6
        "
        >
          <option value="ALL">Todos los estados</option>

          <option value="ACTIVE">Active</option>

          <option value="COMPLETED">Completed</option>

          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      {isLoading ? (
        <p className="text-slate-500">Cargando matrículas...</p>
      ) : filteredEnrollments.length === 0 ? (
        <EmptyState message="No hay matrículas registradas." />
      ) : (
        <EnrollmentTable
          enrollments={filteredEnrollments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <EnrollmentForm
        key={isModalOpen ? "open" : "closed"}
        isOpen={isModalOpen}
        students={students}
        courses={courses}
        onClose={handleCancelForm}
        onSave={handleSave}
      />

      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            ref={statusModalRef}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Cambiar Estado</h2>

            <select
              className="w-full border rounded-lg p-3 mb-4"
              defaultValue={selectedEnrollment.status}
              onChange={(e) =>
                setSelectedEnrollment({
                  ...selectedEnrollment,
                  status: e.target.value,
                })
              }
            >
              <option value="ACTIVE">ACTIVE</option>

              <option value="COMPLETED">COMPLETED</option>

              <option value="CANCELLED">CANCELLED</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeStatusModal}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <PrimaryButton
                onClick={async () => {
                  try {
                    await updateEnrollmentStatus(
                      selectedEnrollment.id,
                      selectedEnrollment.status,
                    );

                    await loadEnrollments();

                    setSelectedEnrollment(null);
                  } catch (error) {
                    console.error(error);
                    alert(
                      "Ocurrió un error al actualizar el estado de la matrícula.",
                    );
                  }
                }}
              >
                Guardar
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!enrollmentToDelete}
        title="Eliminar matrícula"
        message={
          enrollmentToDelete
            ? `¿Desea eliminar la matrícula de ${enrollmentToDelete.students?.first_name} ${enrollmentToDelete.students?.last_name}?`
            : ""
        }
        onCancel={() => setEnrollmentToDelete(null)}
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        isOpen={!!enrollmentToSave}
        title="Crear matrícula"
        message="¿Desea registrar esta matrícula?"
        confirmLabel="Crear"
        confirmColor="blue"
        onCancel={() => setEnrollmentToSave(null)}
        onConfirm={confirmSave}
      />

      <ConfirmDialog
        isOpen={showCancelConfirm}
        title="Cancelar"
        message="¿Desea cancelar? Los cambios no guardados se perderán."
        confirmLabel="Sí, cancelar"
        confirmColor="red"
        onCancel={() => setShowCancelConfirm(false)}
        onConfirm={confirmCancelForm}
      />
    </MainLayout>
  );
}

export default Enrollments;
