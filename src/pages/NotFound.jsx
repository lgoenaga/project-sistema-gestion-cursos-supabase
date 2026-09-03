import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";

function NotFound() {
  return (
    <MainLayout>
      <PageTitle title="404" subtitle="Página no encontrada" />

      <div className="bg-white rounded-xl p-10 text-center text-slate-500">
        <p className="mb-4">La página que buscas no existe.</p>
        <Link to="/" className="text-blue-600 font-medium">
          Volver al Dashboard
        </Link>
      </div>
    </MainLayout>
  );
}

export default NotFound;
