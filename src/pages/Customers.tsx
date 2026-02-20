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
import { Search, Filter, MoreHorizontal, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const customers = [
  { id: 1, name: "James Wilson", email: "james@email.com", orders: 12, spent: "$1,540.00", lastOrder: "Feb 18, 2026", status: "Active" },
  { id: 2, name: "Sarah Chen", email: "sarah@email.com", orders: 8, spent: "$2,120.00", lastOrder: "Feb 17, 2026", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@email.com", orders: 5, spent: "$875.00", lastOrder: "Feb 17, 2026", status: "Active" },
  { id: 4, name: "Emily Davis", email: "emily@email.com", orders: 15, spent: "$3,200.00", lastOrder: "Feb 16, 2026", status: "VIP" },
  { id: 5, name: "Alex Turner", email: "alex@email.com", orders: 3, spent: "$420.00", lastOrder: "Feb 16, 2026", status: "Active" },
  { id: 6, name: "Lisa Park", email: "lisa@email.com", orders: 1, spent: "$109.99", lastOrder: "Feb 15, 2026", status: "Inactive" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success",
  VIP: "bg-primary/10 text-primary",
  Inactive: "bg-muted text-muted-foreground",
};

export default function Customers() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your customer base</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="pl-9 bg-secondary border-0" />
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
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Orders</TableHead>
                  <TableHead className="font-semibold">Total Spent</TableHead>
                  <TableHead className="font-semibold">Last Order</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {customer.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-semibold">{customer.spent}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{customer.lastOrder}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[customer.status]}`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
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
