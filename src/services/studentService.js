import { supabase } from "./supabase";

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select();

  if (error) throw error;

  return data;
}

export async function updateStudent(id, student) {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteStudent(id) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
