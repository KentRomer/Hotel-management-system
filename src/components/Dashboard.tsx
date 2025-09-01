import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Users, CalendarDays, DollarSign } from "lucide-react";
import heroImage from "@/assets/hotel-hero.jpg";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Rooms",
      value: "50",
      icon: Hotel,
      description: "15 available, 30 occupied, 5 maintenance",
      color: "text-hotel-navy"
    },
    {
      title: "Active Guests",
      value: "87",
      icon: Users,
      description: "Current guests in hotel",
      color: "text-hotel-info"
    },
    {
      title: "Today's Check-ins",
      value: "12",
      icon: CalendarDays,
      description: "8 completed, 4 pending",
      color: "text-hotel-success"
    },
    {
      title: "Daily Revenue",
      value: "$15,240",
      icon: DollarSign,
      description: "From room bookings",
      color: "text-hotel-gold"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-hero shadow-luxury">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury hotel lobby" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to Hotel Management
          </h2>
          <p className="text-white/90 text-lg">
            Streamline your hotel operations with our comprehensive management system
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-luxury transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-hotel-navy to-hotel-navy-light p-6 rounded-lg text-white">
              <h3 className="font-semibold mb-2">New Reservation</h3>
              <p className="text-sm opacity-90">Book a room for a new guest</p>
            </div>
            <div className="bg-gradient-gold p-6 rounded-lg text-hotel-navy">
              <h3 className="font-semibold mb-2">Check-in Guest</h3>
              <p className="text-sm opacity-90">Process guest arrival</p>
            </div>
            <div className="bg-gradient-to-br from-hotel-success to-emerald-600 p-6 rounded-lg text-white">
              <h3 className="font-semibold mb-2">Generate Invoice</h3>
              <p className="text-sm opacity-90">Create billing for guest</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Room 205 checked in", guest: "John Smith", time: "2 hours ago", type: "checkin" },
              { action: "Room 315 checked out", guest: "Maria Garcia", time: "4 hours ago", type: "checkout" },
              { action: "New reservation created", guest: "David Wilson", time: "6 hours ago", type: "reservation" },
              { action: "Payment received", guest: "Sarah Johnson", time: "1 day ago", type: "payment" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.guest}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};