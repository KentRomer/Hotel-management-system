import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Bed, Wifi, Car, Coffee } from "lucide-react";

interface Room {
  id: number;
  number: string;
  type: string;
  price: number;
  status: "available" | "occupied" | "maintenance" | "reserved";
  amenities: string[];
}

export const RoomsManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, number: "101", type: "Single", price: 120, status: "available", amenities: ["wifi", "coffee"] },
    { id: 2, number: "102", type: "Double", price: 180, status: "occupied", amenities: ["wifi", "coffee", "parking"] },
    { id: 3, number: "201", type: "Suite", price: 350, status: "available", amenities: ["wifi", "coffee", "parking", "room-service"] },
    { id: 4, number: "202", type: "Double", price: 180, status: "maintenance", amenities: ["wifi", "coffee"] },
    { id: 5, number: "301", type: "Suite", price: 350, status: "reserved", amenities: ["wifi", "coffee", "parking", "room-service"] },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "",
    price: "",
    status: "available" as const,
  });

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "available": return "bg-hotel-success text-white";
      case "occupied": return "bg-hotel-info text-white";
      case "reserved": return "bg-hotel-warning text-hotel-navy";
      case "maintenance": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi className="h-4 w-4" />;
      case "parking": return <Car className="h-4 w-4" />;
      case "coffee": return <Coffee className="h-4 w-4" />;
      default: return <Bed className="h-4 w-4" />;
    }
  };

  const handleAddRoom = () => {
    if (newRoom.number && newRoom.type && newRoom.price) {
      const room: Room = {
        id: rooms.length + 1,
        number: newRoom.number,
        type: newRoom.type,
        price: parseInt(newRoom.price),
        status: newRoom.status,
        amenities: ["wifi", "coffee"],
      };
      setRooms([...rooms, room]);
      setNewRoom({ number: "", type: "", price: "", status: "available" });
      setIsAddDialogOpen(false);
    }
  };

  const updateRoomStatus = (roomId: number, newStatus: Room["status"]) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Rooms Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-card">
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={newRoom.number}
                  onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                  placeholder="e.g., 101"
                />
              </div>
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="roomPrice">Price per Night ($)</Label>
                <Input
                  id="roomPrice"
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                  placeholder="e.g., 120"
                />
              </div>
              <Button onClick={handleAddRoom} className="w-full bg-gradient-primary">
                Add Room
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="shadow-card hover:shadow-luxury transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">Room {room.number}</CardTitle>
                  <p className="text-muted-foreground">{room.type}</p>
                </div>
                <Badge className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-2xl font-bold text-hotel-gold">
                  ${room.price}/night
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Select 
                    value={room.status} 
                    onValueChange={(value: Room["status"]) => updateRoomStatus(room.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
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