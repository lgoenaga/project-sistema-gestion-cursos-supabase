import { supabase } from "./supabase";

export async function getEnrollments() {
  const { data, error } = await supabase
    .from("enrollments")
    .select(`
      *,
      students (
        first_name,
        last_name
      ),
      courses (
        name
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function getStudentOptions() {
  const { data, error } = await supabase
    .from("students")
    .select("id, first_name, last_name")
    .order("first_name");

  if (error) throw error;

  return data;
}

export async function getCourseOptions() {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      name,
      max_capacity
    `)
    .order("name");

  if (error) throw error;

  return data;
}

export async function createEnrollment(
  enrollment
) {
  const { data, error } = await supabase
    .from("enrollments")
    .insert([enrollment])
    .select();

  if (error) throw error;

  return data;
}

export async function getEnrollmentByStudentAndCourse(
  studentId,
  courseId
) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("student_id", studentId)
    .eq("course_id", courseId);

  if (error) throw error;

  return data;
}

export async function getCourseEnrollmentCount(
  courseId
) {
  const { count, error } = await supabase
    .from("enrollments")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("course_id", courseId);

  if (error) throw error;

  return count;
}

export async function updateEnrollmentStatus(
  id,
  status
) {
  const { data, error } = await supabase
    .from("enrollments")
    .update({
      status,
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteEnrollment(id) {
  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("id", id);

  if (error) throw error;
}