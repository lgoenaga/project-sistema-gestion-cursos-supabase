import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import PageTitle from "../components/PageTitle";
import StatCard from "../components/StatCard";
import EnrollmentsByStatusChart from "../components/EnrollmentsByStatusChart";
import PopularCoursesCard from "../components/PopularCoursesCard";
import {
  CoursesIcon,
  EnrollmentsIcon,
  StudentsIcon,
} from "../components/icons/DashboardIcons";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeEnrollments: 0,
    completedEnrollments: 0,
    cancelledEnrollments: 0,
    popularCourses: [],
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, []);

  return (
    <MainLayout>
      <PageTitle title="Dashboard" subtitle="Sistema general de gestión de matrículas, cursos y estudiantes" />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Estudiantes"
          value={stats.totalStudents}
          color="blue"
          icon={StudentsIcon}
          linkTo="/students"
          linkLabel="Ver todos los estudiantes"
        />

        <StatCard
          title="Cursos"
          value={stats.totalCourses}
          color="green"
          icon={CoursesIcon}
          linkTo="/courses"
          linkLabel="Ver todos los cursos"
        />

        <StatCard
          title="Matrículas"
          value={stats.totalEnrollments}
          color="purple"
          icon={EnrollmentsIcon}
          linkTo="/enrollments"
          linkLabel="Ver todas las matrículas"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <EnrollmentsByStatusChart
          activeEnrollments={stats.activeEnrollments}
          completedEnrollments={stats.completedEnrollments}
          cancelledEnrollments={stats.cancelledEnrollments}
        />

        <PopularCoursesCard courses={stats.popularCourses} />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
