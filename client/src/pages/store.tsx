import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";
import Banner from "@/components/banner";
import { useAuth } from "@/hooks/use-auth";

export default function StorePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });

  const addToCart = async (productId: number) => {
    if (!user) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

    try {
      const res = await apiRequest("POST", "/api/cart/items", {
        productType: "product",
        productId,
        quantity: 1,
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

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
        <p className="text-destructive">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Banner title="Store" />
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Available Products</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <Card key={product.id} className="bg-product">
              <CardHeader>
                <img
                  src="https://vedsadhana.com/wp-content/uploads/2025/02/NVR-1-1.png"
                  alt="Product"
                  className="w-full"
                />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="product-price">
                    £{parseFloat(product.price).toFixed(2)}
                  </p>
                  <Button
                    className="pro-btn"
                    onClick={() => addToCart(product.id)}
                    disabled={isAddingToCart[product.id]}
                  >
                    {isAddingToCart[product.id] ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    {isAddingToCart[product.id] ? "Adding..." : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
