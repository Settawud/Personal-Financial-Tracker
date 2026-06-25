type Page = "dashboard" | "transactions";

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-14 items-center px-6">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span>💰</span>
          <span className="hidden sm:inline">Expense Tracker</span>
        </div>
        <nav className="ml-auto flex items-center gap-2">
          <button
            onClick={() => onPageChange("dashboard")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === "dashboard"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onPageChange("transactions")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === "transactions"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            Transactions
          </button>
        </nav>
      </div>
    </header>
  );
}