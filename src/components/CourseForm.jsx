import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";

function CourseForm({
  isOpen,
  course,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    max_capacity: "",
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        code: "",
        name: "",
        description: "",
        max_capacity: "",
      });
    }
  }, [course]);

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

    onSave({
      ...formData,
      max_capacity: Number(
        formData.max_capacity
      ),
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {course
            ? "Editar Curso"
            : "Nuevo Curso"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="code"
            placeholder="Código"
            value={formData.code}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Nombre del curso"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
          />

          <input
            type="number"
            name="max_capacity"
            placeholder="Capacidad máxima"
            value={formData.max_capacity}
            onChange={handleChange}
            min="1"
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

            <PrimaryButton type="submit">
              Guardar
            </PrimaryButton>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CourseForm;