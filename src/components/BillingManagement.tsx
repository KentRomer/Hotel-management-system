import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Receipt, DollarSign, Calendar, User, Download, Search } from "lucide-react";

interface Invoice {
  id: number;
  guestName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  roomRate: number;
  nights: number;
  subtotal: number;
  taxes: number;
  totalAmount: number;
  paymentStatus: "paid" | "unpaid" | "partially-paid";
  invoiceDate: string;
}

export const BillingManagement = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1001,
      guestName: "John Smith",
      roomNumber: "205",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-18",
      roomRate: 180,
      nights: 3,
      subtotal: 540,
      taxes: 54,
      totalAmount: 594,
      paymentStatus: "paid",
      invoiceDate: "2024-01-18"
    },
    {
      id: 1002,
      guestName: "Maria Garcia",
      roomNumber: "315",
      checkInDate: "2024-01-10",
      checkOutDate: "2024-01-14",
      roomRate: 350,
      nights: 4,
      subtotal: 1400,
      taxes: 140,
      totalAmount: 1540,
      paymentStatus: "paid",
      invoiceDate: "2024-01-14"
    },
    {
      id: 1003,
      guestName: "David Wilson",
      roomNumber: "301",
      checkInDate: "2024-01-20",
      checkOutDate: "2024-01-23",
      roomRate: 350,
      nights: 3,
      subtotal: 1050,
      taxes: 105,
      totalAmount: 1155,
      paymentStatus: "unpaid",
      invoiceDate: "2024-01-23"
    },
    {
      id: 1004,
      guestName: "Sarah Johnson",
      roomNumber: "102",
      checkInDate: "2024-01-18",
      checkOutDate: "2024-01-21",
      roomRate: 180,
      nights: 3,
      subtotal: 540,
      taxes: 54,
      totalAmount: 594,
      paymentStatus: "partially-paid",
      invoiceDate: "2024-01-21"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getPaymentStatusColor = (status: Invoice["paymentStatus"]) => {
    switch (status) {
      case "paid": return "bg-hotel-success text-white";
      case "unpaid": return "bg-destructive text-destructive-foreground";
      case "partially-paid": return "bg-hotel-warning text-hotel-navy";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const updatePaymentStatus = (invoiceId: number, newStatus: Invoice["paymentStatus"]) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, paymentStatus: newStatus } : invoice
    ));
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.roomNumber.includes(searchTerm) ||
    invoice.id.toString().includes(searchTerm)
  );

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const paidAmount = invoices
    .filter(invoice => invoice.paymentStatus === "paid")
    .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const unpaidAmount = invoices
    .filter(invoice => invoice.paymentStatus === "unpaid")
    .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Billing Management</h2>
        <Button className="bg-gradient-primary shadow-card">
          <Receipt className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-hotel-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-hotel-gold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All invoices</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-hotel-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-hotel-success">${paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Collected payments</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${unpaidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pending payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices by guest name, room number, or invoice ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="grid gap-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className="shadow-card hover:shadow-luxury transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-hotel-navy" />
                    Invoice #{invoice.id}
                  </CardTitle>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <User className="h-4 w-4" />
                    {invoice.guestName} - Room {invoice.roomNumber}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getPaymentStatusColor(invoice.paymentStatus)}>
                    {invoice.paymentStatus.replace('-', ' ')}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {invoice.invoiceDate}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Stay Period</p>
                  <p className="font-medium">{invoice.checkInDate} to {invoice.checkOutDate}</p>
                  <p className="text-xs text-muted-foreground">{invoice.nights} nights</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Room Rate</p>
                  <p className="font-medium">${invoice.roomRate}/night</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${invoice.subtotal}</p>
                  <p className="text-xs text-muted-foreground">+ ${invoice.taxes} taxes</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-hotel-gold">${invoice.totalAmount}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {invoice.paymentStatus === "unpaid" && (
                    <Button 
                      size="sm" 
                      className="bg-hotel-success"
                      onClick={() => updatePaymentStatus(invoice.id, "paid")}
                    >
                      Mark as Paid
                    </Button>
                  )}
                  {invoice.paymentStatus === "partially-paid" && (
                    <Button 
                      size="sm" 
                      className="bg-hotel-success"
                      onClick={() => updatePaymentStatus(invoice.id, "paid")}
                    >
                      Complete Payment
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </div>
                
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};