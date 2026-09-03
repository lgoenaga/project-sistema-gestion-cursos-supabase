import { useState } from "react";

// Shared form state + change handler, reused by CourseForm/StudentForm/EnrollmentForm.
export function useFormState(initialData) {
  const [formData, setFormData] = useState(initialData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return { formData, setFormData, handleChange };
}
