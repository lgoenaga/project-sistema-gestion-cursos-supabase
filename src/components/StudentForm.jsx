import { useEffect, useState } from "react";

import PrimaryButton from "./PrimaryButton";

function StudentForm({
  isOpen,
  student,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });
    }
  }, [student]);

  if (!isOpen) return null;

function handleChange(event) {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {student
            ? "Editar Estudiante"
            : "Nuevo Estudiante"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Celular"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                border
                rounded-lg
              "
            >
              Cancelar
            </button>

            <PrimaryButton type="submit">
              Guardar
            </PrimaryButton>

          </div>

        </form>

      </div>
    </div>
  );
}

export default StudentForm;