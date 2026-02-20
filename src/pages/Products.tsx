import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  { id: 1, name: "Nike Air Max 90", sku: "NAM-090", category: "Sneakers", price: "$129.99", stock: 45, status: "Active" },
  { id: 2, name: "Adidas Ultra Boost 22", sku: "AUB-022", category: "Running", price: "$179.99", stock: 32, status: "Active" },
  { id: 3, name: "Jordan 1 Retro High OG", sku: "J1R-HOG", category: "Basketball", price: "$175.00", stock: 12, status: "Low Stock" },
  { id: 4, name: "New Balance 550", sku: "NB-550", category: "Sneakers", price: "$109.99", stock: 67, status: "Active" },
  { id: 5, name: "Yeezy Slide Onyx", sku: "YZS-ONX", category: "Slides", price: "$69.99", stock: 0, status: "Out of Stock" },
  { id: 6, name: "Puma RS-X", sku: "PRS-X01", category: "Sneakers", price: "$109.99", stock: 28, status: "Active" },
  { id: 7, name: "Nike Dunk Low Panda", sku: "NDL-PND", category: "Sneakers", price: "$109.99", stock: 8, status: "Low Stock" },
  { id: 8, name: "Converse Chuck 70", sku: "CC-070", category: "Classic", price: "$89.99", stock: 53, status: "Active" },
];

const statusVariant: Record<string, string> = {
  Active: "bg-success/10 text-success",
  "Low Stock": "bg-warning/10 text-warning",
  "Out of Stock": "bg-destructive/10 text-destructive",
};

export default function Products() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your shoe inventory</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 bg-secondary border-0" />
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
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">SKU</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-semibold">{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusVariant[product.status]}`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
