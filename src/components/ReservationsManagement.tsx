import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User, Hotel, Clock } from "lucide-react";

interface Reservation {
  id: number;
  guestName: string;
  guestEmail: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
  totalAmount: number;
  nights: number;
}

export const ReservationsManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      guestName: "John Smith",
      guestEmail: "john.smith@email.com",
      roomNumber: "205",
      roomType: "Double",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-18",
      status: "checked-in",
      totalAmount: 540,
      nights: 3
    },
    {
      id: 2,
      guestName: "Maria Garcia",
      guestEmail: "maria.garcia@email.com",
      roomNumber: "315",
      roomType: "Suite",
      checkInDate: "2024-01-10",
      checkOutDate: "2024-01-14",
      status: "checked-out",
      totalAmount: 1400,
      nights: 4
    },
    {
      id: 3,
      guestName: "David Wilson",
      guestEmail: "david.wilson@email.com",
      roomNumber: "301",
      roomType: "Suite",
      checkInDate: "2024-01-20",
      checkOutDate: "2024-01-23",
      status: "confirmed",
      totalAmount: 1050,
      nights: 3
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReservation, setNewReservation] = useState({
    guestName: "",
    guestEmail: "",
    roomNumber: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed": return "bg-hotel-info text-white";
      case "checked-in": return "bg-hotel-success text-white";
      case "checked-out": return "bg-muted text-muted-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddReservation = () => {
    if (newReservation.guestName && newReservation.roomNumber && newReservation.checkInDate && newReservation.checkOutDate) {
      const nights = calculateNights(newReservation.checkInDate, newReservation.checkOutDate);
      const pricePerNight = newReservation.roomType === "Suite" ? 350 : newReservation.roomType === "Double" ? 180 : 120;
      
      const reservation: Reservation = {
        id: reservations.length + 1,
        ...newReservation,
        status: "confirmed",
        nights,
        totalAmount: nights * pricePerNight,
      };
      
      setReservations([...reservations, reservation]);
      setNewReservation({ 
        guestName: "", 
        guestEmail: "", 
        roomNumber: "", 
        roomType: "", 
        checkInDate: "", 
        checkOutDate: "" 
      });
      setIsAddDialogOpen(false);
    }
  };

  const updateReservationStatus = (reservationId: number, newStatus: Reservation["status"]) => {
    setReservations(reservations.map(reservation => 
      reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Reservations Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-card">
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Reservation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  id="guestName"
                  value={newReservation.guestName}
                  onChange={(e) => setNewReservation({ ...newReservation, guestName: e.target.value })}
                  placeholder="Enter guest name"
                />
              </div>
              <div>
                <Label htmlFor="guestEmail">Guest Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={newReservation.guestEmail}
                  onChange={(e) => setNewReservation({ ...newReservation, guestEmail: e.target.value })}
                  placeholder="guest@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    value={newReservation.roomNumber}
                    onChange={(e) => setNewReservation({ ...newReservation, roomNumber: e.target.value })}
                    placeholder="e.g., 101"
                  />
                </div>
                <div>
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select value={newReservation.roomType} onValueChange={(value) => setNewReservation({ ...newReservation, roomType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double">Double</SelectItem>
                      <SelectItem value="Suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="checkIn">Check-in</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={newReservation.checkInDate}
                    onChange={(e) => setNewReservation({ ...newReservation, checkInDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="checkOut">Check-out</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={newReservation.checkOutDate}
                    onChange={(e) => setNewReservation({ ...newReservation, checkOutDate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddReservation} className="w-full bg-gradient-primary">
                Create Reservation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="shadow-card hover:shadow-luxury transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5 text-hotel-navy" />
                    {reservation.guestName}
                  </CardTitle>
                  <p className="text-muted-foreground">{reservation.guestEmail}</p>
                </div>
                <Badge className={getStatusColor(reservation.status)}>
                  {reservation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Hotel className="h-4 w-4 text-hotel-gold" />
                  <div>
                    <p className="font-medium">Room {reservation.roomNumber}</p>
                    <p className="text-sm text-muted-foreground">{reservation.roomType}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-hotel-info" />
                  <div>
                    <p className="font-medium">Check-in</p>
                    <p className="text-sm text-muted-foreground">{reservation.checkInDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-hotel-warning" />
                  <div>
                    <p className="font-medium">Check-out</p>
                    <p className="text-sm text-muted-foreground">{reservation.checkOutDate}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-hotel-gold">${reservation.totalAmount}</p>
                  <p className="text-sm text-muted-foreground">{reservation.nights} nights</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Select 
                  value={reservation.status} 
                  onValueChange={(value: Reservation["status"]) => updateReservationStatus(reservation.id, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};