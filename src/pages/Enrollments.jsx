import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";
import EnrollmentTable from "../components/EnrollmentTable";
import EnrollmentForm from "../components/EnrollmentForm";
import ConfirmDialog from "../components/ConfirmDialog";

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

  const [enrollments, setEnrollments] =
    useState([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [students, setStudents] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [selectedEnrollment, setSelectedEnrollment] =
    useState(null);

  const [enrollmentToDelete, setEnrollmentToDelete] =
    useState(null);

  const filteredEnrollments =
    enrollments.filter((enrollment) => {

      const student =
        `${enrollment.students?.first_name} ${enrollment.students?.last_name}`;

      const course =
        enrollment.courses?.name || "";

      const matchSearch =
        student
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        course
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "ALL" ||
        enrollment.status === statusFilter;

      return (
        matchSearch &&
        matchStatus
      );
    });

  useEffect(() => {
    loadEnrollments();
    loadOptions();
  }, []);

  async function loadEnrollments() {
    const data =
      await getEnrollments();

    setEnrollments(data);
  }

  async function loadOptions() {
    const studentsData =
      await getStudentOptions();

    const coursesData =
      await getCourseOptions();

    setStudents(studentsData);
    setCourses(coursesData);
  }

  async function handleSave(formData) {
    try {

      const duplicated =
        await getEnrollmentByStudentAndCourse(
          formData.student_id,
          formData.course_id
        );

      if (duplicated.length > 0) {
        alert(
          "El estudiante ya se encuentra matriculado en este curso."
        );
        return;
      }

      const selectedCourse =
        courses.find(
          (course) =>
            course.id === formData.course_id
        );

      const currentEnrollments =
        await getCourseEnrollmentCount(
          formData.course_id
        );

      if (
        currentEnrollments >=
        selectedCourse.max_capacity
      ) {
        alert(
          "El curso ha alcanzado su capacidad máxima."
        );
        return;
      }

      await createEnrollment(formData);

      await loadEnrollments();

      setIsModalOpen(false);

    } catch (error) {
      console.error(error);

      alert(
        "Ocurrió un error al registrar la matrícula."
      );
    }
  }

  function handleEdit(enrollment) {
    setSelectedEnrollment(enrollment);
  }

  function handleDelete(enrollment) {
    setEnrollmentToDelete(enrollment);
  }

  async function confirmDelete() {
    try {

      await deleteEnrollment(
        enrollmentToDelete.id
      );

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
        <PrimaryButton
          onClick={() => setIsModalOpen(true)}
        >
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
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
          bg-white
          border
          rounded-lg
          p-3
          mb-6
        "
        >
          <option value="ALL">
            Todos los estados
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </select>


      </div>
      <EnrollmentTable
        enrollments={filteredEnrollments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EnrollmentForm
        isOpen={isModalOpen}
        students={students}
        courses={courses}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSave={handleSave}
      />

      {
        selectedEnrollment && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-md">

              <h2 className="text-xl font-bold mb-4">
                Cambiar Estado
              </h2>

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
                <option value="ACTIVE">
                  ACTIVE
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>

                <option value="CANCELLED">
                  CANCELLED
                </option>
              </select>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() =>
                    setSelectedEnrollment(null)
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>

                <PrimaryButton
                  onClick={async () => {

                    await updateEnrollmentStatus(
                      selectedEnrollment.id,
                      selectedEnrollment.status
                    );

                    await loadEnrollments();

                    setSelectedEnrollment(null);
                  }}
                >
                  Guardar
                </PrimaryButton>

              </div>

            </div>

          </div>
        )
      }

      <ConfirmDialog
        isOpen={!!enrollmentToDelete}
        title="Eliminar matrícula"
        message={
          enrollmentToDelete
            ? `¿Desea eliminar la matrícula de ${enrollmentToDelete.students?.first_name} ${enrollmentToDelete.students?.last_name}?`
            : ""
        }
        onCancel={() =>
          setEnrollmentToDelete(null)
        }
        onConfirm={confirmDelete}
      />

    </MainLayout>
  );
}

export default Enrollments;