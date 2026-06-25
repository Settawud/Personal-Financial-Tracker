type Page = "dashboard" | "transactions";

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const items: Array<{ id: Page; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "transactions", label: "Transactions", icon: "📋" },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-48 min-h-[calc(100vh-3.5rem)] border-r bg-background p-3 gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onPageChange(item.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left ${
            currentPage === item.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </aside>
  );
}