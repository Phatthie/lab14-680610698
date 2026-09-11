import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<Registrant[]>([]);

  useEffect(() => {
    const stored: Registrant[] = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    );
    setRegistrations(stored);
  }, []);
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {/* Conditional Rendering + Render Component */}
      {registrations.length === 0 ? (
        <div className="text-muted">ยังไม่มีผู้ลงทะเบียน</div>
      ) : (
        <>
          <div className="mb-3">ผู้ลงทะเบียนแล้ว ({registrations.length} คน)</div>
          {registrations.map((user) => (
            <UserRegisterCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
