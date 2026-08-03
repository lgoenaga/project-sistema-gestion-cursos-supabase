import { supabase } from "./supabase";

export async function getDashboardStats() {
  const [
    studentsResult,
    coursesResult,
    enrollmentsResult,
    activeResult,
    completedResult,
    cancelledResult,
    popularCoursesResult,
  ] = await Promise.all([
    supabase.from("students").select("*", {
      count: "exact",
      head: true,
    }),

    supabase.from("courses").select("*", {
      count: "exact",
      head: true,
    }),

    supabase.from("enrollments").select("*", {
      count: "exact",
      head: true,
    }),

    supabase
      .from("enrollments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "ACTIVE"),

    supabase
      .from("enrollments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "COMPLETED"),

    supabase
      .from("enrollments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "CANCELLED"),

    supabase.from("courses").select(`
      name,
      enrollments (count)
    `),
  ]);

  const popularCourses = (popularCoursesResult.data ?? [])
    .map((course) => ({
      name: course.name,
      count: course.enrollments?.[0]?.count ?? 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return {
    totalStudents: studentsResult.count || 0,
    totalCourses: coursesResult.count || 0,
    totalEnrollments: enrollmentsResult.count || 0,
    activeEnrollments: activeResult.count || 0,
    completedEnrollments: completedResult.count || 0,
    cancelledEnrollments: cancelledResult.count || 0,
    popularCourses,
  };
}
