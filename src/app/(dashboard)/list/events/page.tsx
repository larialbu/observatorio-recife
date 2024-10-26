import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panorama de Recife</h1>
        <p className="text-gray-600">Visão geral das métricas principais</p>
      </div>

      {/* USER CARDS */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <UserCard type="Usuarios" />
        <UserCard type="Voos" />
        <UserCard type="Empregabilidade" />
        <UserCard type="Ações" />
      </div>

      {/* FIRST ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-4">
        <CountChart title="Movimentação do aeroporto" />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <AttendanceChart title="Recife" />

        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
        <AttendanceChart title="Empresas" />

        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
        <FinanceChart title="Taxa Selic" />
        </div>
      </div>

      {/* SECOND ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <CountChart title="Balança Comercial" />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
         <CountChart title="Movimentação de emprego" />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
        <FinanceChart title="IPCA" />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
        <FinanceChart title="Ranking Competitividade" />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
