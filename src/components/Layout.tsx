import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Hotel, Users, CalendarDays, Receipt, LayoutDashboard } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "rooms", label: "Rooms", icon: Hotel },
    { id: "guests", label: "Guests", icon: Users },
    { id: "reservations", label: "Reservations", icon: CalendarDays },
    { id: "billing", label: "Billing", icon: Receipt },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-luxury">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hotel className="h-8 w-8 text-hotel-gold" />
              <h1 className="text-2xl font-bold text-primary-foreground">
                Hotel Management System
              </h1>
            </div>
            <div className="text-primary-foreground/80 text-sm">
              Welcome, Hotel Staff
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-80px)]">
          <nav className="p-6 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? "bg-gradient-primary text-primary-foreground shadow-card" 
                    : "hover:bg-muted"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};