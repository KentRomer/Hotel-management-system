import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Phone, Mail, IdCard, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomNumber?: string;
  status: "active" | "checked-out" | "upcoming";
  totalStays: number;
}

export const GuestsManagement = () => {
  const [guests, setGuests] = useState<Guest[]>([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@email.com", 
      phone: "+1 (555) 123-4567", 
      idNumber: "ID123456789",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-18",
      roomNumber: "205",
      status: "active",
      totalStays: 3
    },
    { 
      id: 2, 
      name: "Maria Garcia", 
      email: "maria.garcia@email.com", 
      phone: "+1 (555) 987-6543", 
      idNumber: "ID987654321",
      checkInDate: "2024-01-10",
      checkOutDate: "2024-01-14",
      roomNumber: "315",
      status: "checked-out",
      totalStays: 1
    },
    { 
      id: 3, 
      name: "David Wilson", 
      email: "david.wilson@email.com", 
      phone: "+1 (555) 456-7890", 
      idNumber: "ID456789123",
      checkInDate: "2024-01-20",
      checkOutDate: "2024-01-23",
      status: "upcoming",
      totalStays: 2
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
  });

  const getStatusColor = (status: Guest["status"]) => {
    switch (status) {
      case "active": return "bg-hotel-success text-white";
      case "checked-out": return "bg-muted text-muted-foreground";
      case "upcoming": return "bg-hotel-info text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAddGuest = () => {
    if (newGuest.name && newGuest.email && newGuest.phone && newGuest.idNumber) {
      const guest: Guest = {
        id: guests.length + 1,
        ...newGuest,
        status: "upcoming",
        totalStays: 0,
      };
      setGuests([...guests, guest]);
      setNewGuest({ name: "", email: "", phone: "", idNumber: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Guest Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-card">
              <Plus className="mr-2 h-4 w-4" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="guestName">Full Name</Label>
                <Input
                  id="guestName"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Enter guest's full name"
                />
              </div>
              <div>
                <Label htmlFor="guestEmail">Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  placeholder="guest@email.com"
                />
              </div>
              <div>
                <Label htmlFor="guestPhone">Phone</Label>
                <Input
                  id="guestPhone"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="guestId">ID Number</Label>
                <Input
                  id="guestId"
                  value={newGuest.idNumber}
                  onChange={(e) => setNewGuest({ ...newGuest, idNumber: e.target.value })}
                  placeholder="ID123456789"
                />
              </div>
              <Button onClick={handleAddGuest} className="w-full bg-gradient-primary">
                Add Guest
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests.map((guest) => (
          <Card key={guest.id} className="shadow-card hover:shadow-luxury transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">{guest.name}</CardTitle>
                  <Badge className={getStatusColor(guest.status)}>
                    {guest.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <History className="h-4 w-4 mr-1" />
                    {guest.totalStays} stays
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-hotel-info" />
                  <span className="truncate">{guest.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-hotel-success" />
                  <span>{guest.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IdCard className="h-4 w-4 text-hotel-warning" />
                  <span>{guest.idNumber}</span>
                </div>

                {guest.status === "active" && guest.roomNumber && (
                  <div className="bg-hotel-gold-light p-3 rounded-md">
                    <p className="text-sm font-medium text-hotel-navy">
                      Currently in Room {guest.roomNumber}
                    </p>
                    <p className="text-xs text-hotel-navy/70">
                      Check-out: {guest.checkOutDate}
                    </p>
                  </div>
                )}

                {guest.status === "upcoming" && (
                  <div className="bg-hotel-info/10 p-3 rounded-md">
                    <p className="text-sm font-medium text-hotel-info">
                      Arriving: {guest.checkInDate}
                    </p>
                  </div>
                )}

                {guest.status === "checked-out" && (
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Last stay: {guest.checkOutDate}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View History
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};