import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";
import StudentTable from "../components/StudentTable";

import StudentForm from "../components/StudentForm";
import ConfirmDialog from "../components/ConfirmDialog";

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

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const data = await getStudents();
    setStudents(data);
  }

  const filteredStudents = students.filter(
    (student) =>
      student.first_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.last_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.phone
        .toLowerCase()
        .includes(search.toLowerCase())
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
    try {

      if (selectedStudent) {
        await updateStudent(
          selectedStudent.id,
          studentData
        );
      } else {
        await createStudent(studentData);
      }

      await loadStudents();

      setIsModalOpen(false);

    } catch (error) {
      console.error(error);
    }
  }


  function handleDelete(student) {
    setStudentToDelete(student);
  }

  async function confirmDelete() {
    try {
      await deleteStudent(
        studentToDelete.id
      );

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

        <PrimaryButton
          onClick={handleCreate}
        >
          Nuevo Estudiante
        </PrimaryButton>

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

      <StudentTable
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StudentForm
        isOpen={isModalOpen}
        student={selectedStudent}
        onClose={() =>
          setIsModalOpen(false)
        }
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
        onCancel={() =>
          setStudentToDelete(null)
        }
        onConfirm={confirmDelete}
      />

    </MainLayout>


  );
}

export default Students;