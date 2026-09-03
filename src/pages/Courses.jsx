import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import PageTitle from "../components/ui/PageTitle";
import PrimaryButton from "../components/ui/PrimaryButton";
import EmptyState from "../components/ui/EmptyState";
import CourseTable from "../components/tables/CourseTable";
import CourseForm from "../components/forms/CourseForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courseToDelete, setCourseToDelete] = useState(null);
  const [courseToSave, setCourseToSave] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreate() {
    setSelectedCourse(null);
    setIsModalOpen(true);
  }

  function handleEdit(course) {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }

  function handleSave(courseData) {
    setCourseToSave(courseData);
  }

  function handleCancelForm() {
    setShowCancelConfirm(true);
  }

  function confirmCancelForm() {
    setShowCancelConfirm(false);
    setIsModalOpen(false);
    setSelectedCourse(null);
  }

  async function confirmSave() {
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse.id, courseToSave);
      } else {
        await createCourse(courseToSave);
      }

      await loadCourses();

      setCourseToSave(null);
      setIsModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error(error);
      alert("Error al guardar el curso");
    }
  }

  function handleDelete(course) {
    setCourseToDelete(course);
  }

  async function confirmDelete() {
    try {
      await deleteCourse(courseToDelete.id);

      await loadCourses();

      setCourseToDelete(null);
    } catch (error) {
      console.error(error);

      alert(
        "No fue posible eliminar el curso. Puede que tenga matrículas asociadas.",
      );
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.code?.toLowerCase().includes(search.toLowerCase()) ||
      course.name?.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Cursos" subtitle="Gestión de cursos registrados" />

        <PrimaryButton onClick={handleCreate}>Nuevo Curso</PrimaryButton>
      </div>

      <input
        type="text"
        placeholder="Buscar curso..."
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

      {isLoading ? (
        <p className="text-slate-500">Cargando cursos...</p>
      ) : filteredCourses.length === 0 ? (
        <EmptyState message="No hay cursos registrados." />
      ) : (
        <CourseTable
          courses={filteredCourses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CourseForm
        key={`${selectedCourse?.id ?? "new"}-${isModalOpen}`}
        isOpen={isModalOpen}
        course={selectedCourse}
        onClose={handleCancelForm}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={!!courseToDelete}
        title="Eliminar curso"
        message={
          courseToDelete
            ? `¿Desea eliminar el curso ${courseToDelete.name}?`
            : ""
        }
        onCancel={() => setCourseToDelete(null)}
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        isOpen={!!courseToSave}
        title={selectedCourse ? "Guardar cambios" : "Crear curso"}
        message={
          courseToSave
            ? selectedCourse
              ? `¿Desea guardar los cambios del curso ${courseToSave.name}?`
              : `¿Desea crear el curso ${courseToSave.name}?`
            : ""
        }
        confirmLabel={selectedCourse ? "Guardar" : "Crear"}
        confirmColor="blue"
        onCancel={() => setCourseToSave(null)}
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

export default Courses;
