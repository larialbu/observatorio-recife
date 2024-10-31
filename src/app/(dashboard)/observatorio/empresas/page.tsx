import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Empresas</h1>
        <p className="text-gray-600">Visão geral das métricas de Empresas</p>
      </div>
      {/* FIRST ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-[450px]">
          <CountChart title="TITULO" />
        </div>
        <div className="h-[450px]">
          <AttendanceChart title="TITULO" />
        </div>
        <div className="h-[450px]">
          <FinanceChart title="TITULO" />
        </div>
        <div className="h-[450px]">
          <CountChart title="TITULO" />
        </div>
      </div>

      {/* SECOND ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-[450px]">
          <AttendanceChart title="TITULO" />
        </div>
        <div className="h-[450px]">
          <FinanceChart title="TITULO" />
        </div>
        <div className="h-[450px]">
          <CountChart title="TITULO" />
        </div>
        <div className="h-[450px]">
          <AttendanceChart title="TITULO" />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
