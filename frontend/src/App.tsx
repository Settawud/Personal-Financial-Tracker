import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";

type Page = "dashboard" | "transactions";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar currentPage={page} onPageChange={setPage} />
      <div className="flex">
        <Sidebar currentPage={page} onPageChange={setPage} />
        <main className="flex-1 p-6">
          {page === "dashboard" ? <Dashboard /> : <Transactions />}
        </main>
      </div>
    </div>
  );
}