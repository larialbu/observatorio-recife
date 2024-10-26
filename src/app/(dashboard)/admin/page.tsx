import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col gap-8">
      {/* USER CARDS */}
      <div className="flex gap-4 justify-between flex-wrap">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
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
