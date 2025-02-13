import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { Product } from "@shared/schema";

export default function StorePageAdmin() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: products, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    enabled: !!user && user.role === 'admin',
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("/api/admin/products/seed", "POST");
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Success",
        description: "Sample products have been added",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add sample products",
        variant: "destructive",
      });
    },
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">You don't have access to this page.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Store Management</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Products</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            {(!products || products.length === 0) && (
              <Button 
                variant="outline"
                onClick={() => seedMutation.mutate()}
                disabled={seedMutation.isPending}
              >
                {seedMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Sample Products'
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>£{parseFloat(product.price).toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.isActive ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {(isAddingProduct || editingProduct) && (
        <ProductForm
          product={editingProduct ?? undefined}
          onClose={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}