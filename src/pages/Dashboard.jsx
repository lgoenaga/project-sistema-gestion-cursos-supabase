import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import PageTitle from "../components/PageTitle";
import StatCard from "../components/StatCard";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeEnrollments: 0,
    completedEnrollments: 0,
    cancelledEnrollments: 0,
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
      <PageTitle title="Dashboard" subtitle="Resumen general del sistema" />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Estudiantes"
          value={stats.totalStudents}
          color="blue"
        />

        <StatCard title="Cursos" value={stats.totalCourses} color="green" />

        <StatCard
          title="Matrículas"
          value={stats.totalEnrollments}
          color="purple"
        />

        <StatCard
          title="Activas"
          value={stats.activeEnrollments}
          color="emerald"
        />

        <StatCard
          title="Completadas"
          value={stats.completedEnrollments}
          color="blue"
        />

        <StatCard
          title="Canceladas"
          value={stats.cancelledEnrollments}
          color="red"
        />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
