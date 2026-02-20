import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const orders = [
  { id: "#ORD-2847", customer: "James Wilson", email: "james@email.com", product: "Nike Air Max 90", qty: 1, amount: "$129.99", date: "Feb 18, 2026", status: "Delivered" },
  { id: "#ORD-2846", customer: "Sarah Chen", email: "sarah@email.com", product: "Adidas Ultra Boost", qty: 2, amount: "$359.98", date: "Feb 17, 2026", status: "Shipped" },
  { id: "#ORD-2845", customer: "Mike Johnson", email: "mike@email.com", product: "Jordan 1 Retro High", qty: 1, amount: "$175.00", date: "Feb 17, 2026", status: "Processing" },
  { id: "#ORD-2844", customer: "Emily Davis", email: "emily@email.com", product: "New Balance 550", qty: 1, amount: "$109.99", date: "Feb 16, 2026", status: "Delivered" },
  { id: "#ORD-2843", customer: "Alex Turner", email: "alex@email.com", product: "Yeezy Slide Onyx", qty: 3, amount: "$209.97", date: "Feb 16, 2026", status: "Shipped" },
  { id: "#ORD-2842", customer: "Lisa Park", email: "lisa@email.com", product: "Nike Dunk Low Panda", qty: 1, amount: "$109.99", date: "Feb 15, 2026", status: "Cancelled" },
  { id: "#ORD-2841", customer: "Tom Brown", email: "tom@email.com", product: "Puma RS-X", qty: 1, amount: "$109.99", date: "Feb 15, 2026", status: "Delivered" },
  { id: "#ORD-2840", customer: "Anna Lee", email: "anna@email.com", product: "Converse Chuck 70", qty: 2, amount: "$179.98", date: "Feb 14, 2026", status: "Processing" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-success/10 text-success",
  Shipped: "bg-primary/10 text-primary",
  Processing: "bg-warning/10 text-warning",
  Cancelled: "bg-destructive/10 text-destructive",
};

export default function Orders() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage customer orders</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9 bg-secondary border-0" />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">Qty</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs font-semibold">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.qty}</TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
