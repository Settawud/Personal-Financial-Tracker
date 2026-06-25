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
        <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
          {page === "dashboard" ? <Dashboard /> : <Transactions />}
        </main>
      </div>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-background md:hidden">
        <button
          onClick={() => setPage("dashboard")}
          className={`flex-1 py-3 text-sm font-medium ${
            page === "dashboard" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setPage("transactions")}
          className={`flex-1 py-3 text-sm font-medium ${
            page === "transactions" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          📋 Transactions
        </button>
      </nav>
    </div>
  );
}