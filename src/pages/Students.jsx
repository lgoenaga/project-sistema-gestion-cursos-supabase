import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import PageTitle from "../components/ui/PageTitle";
import PrimaryButton from "../components/ui/PrimaryButton";
import EmptyState from "../components/ui/EmptyState";
import StudentTable from "../components/tables/StudentTable";

import StudentForm from "../components/forms/StudentForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToSave, setStudentToSave] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(search.toLowerCase()) ||
      student.last_name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.toLowerCase().includes(search.toLowerCase()),
  );

  function handleCreate() {
    setSelectedStudent(null);
    setIsModalOpen(true);
  }

  function handleEdit(student) {
    setSelectedStudent(student);
    setIsModalOpen(true);
  }

  async function handleSave(studentData) {
    setStudentToSave(studentData);
  }

  async function confirmSave() {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, studentToSave);
      } else {
        await createStudent(studentToSave);
      }

      await loadStudents();

      setStudentToSave(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelForm() {
    setShowCancelConfirm(true);
  }

  function confirmCancelForm() {
    setShowCancelConfirm(false);
    setIsModalOpen(false);
    setSelectedStudent(null);
  }

  function handleDelete(student) {
    setStudentToDelete(student);
  }

  async function confirmDelete() {
    try {
      await deleteStudent(studentToDelete.id);

      await loadStudents();

      setStudentToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle
          title="Estudiantes"
          subtitle="Gestión de estudiantes registrados"
        />

        <PrimaryButton children="Nuevo Estudiante" onClick={handleCreate} />
      </div>

      <input
        type="text"
        placeholder="Buscar estudiante..."
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
        <p className="text-slate-500">Cargando estudiantes...</p>
      ) : filteredStudents.length === 0 ? (
        <EmptyState message="No hay estudiantes registrados." />
      ) : (
        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <StudentForm
        key={`${selectedStudent?.id ?? "new"}-${isModalOpen}`}
        isOpen={isModalOpen}
        student={selectedStudent}
        onClose={handleCancelForm}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={!!studentToDelete}
        title="Eliminar estudiante"
        message={
          studentToDelete
            ? `¿Desea eliminar a ${studentToDelete.first_name} ${studentToDelete.last_name}?`
            : ""
        }
        onCancel={() => setStudentToDelete(null)}
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        isOpen={!!studentToSave}
        title={selectedStudent ? "Guardar cambios" : "Crear estudiante"}
        message={
          studentToSave
            ? selectedStudent
              ? `¿Desea guardar los cambios de ${studentToSave.first_name} ${studentToSave.last_name}?`
              : `¿Desea crear al estudiante ${studentToSave.first_name} ${studentToSave.last_name}?`
            : ""
        }
        confirmLabel={selectedStudent ? "Guardar" : "Crear"}
        confirmColor="blue"
        onCancel={() => setStudentToSave(null)}
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

export default Students;
