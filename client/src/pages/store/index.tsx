import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import Banner from "@/components/banner";
import { useAuth } from "@/hooks/use-auth";

export default function StorePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState<{[key: string]: boolean}>({});

  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    }
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

    setIsAddingToCart(prev => ({ ...prev, [productId]: true }));

    try {
      const product = products?.find(p => p.id === productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const res = await apiRequest("POST", "/api/cart/items", {
        productType: "product",
        productId,
        quantity: 1,
        price: product.price
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      await queryClient.invalidateQueries({ queryKey: ["/api/cart/items"] });

      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Banner title="Store" />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="col-span-full flex justify-center">
              <p className="text-destructive">Failed to load products. Please try again.</p>
            </div>
          ) : (
            products?.map((product) => (
              <Card key={product.id} className="flex flex-col">
                {product.imageUrl && (
                  <div className="relative pt-[56.25%]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-lg font-bold">
                      £{Number(product.price).toFixed(2)}
                    </p>
                    <Button
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
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}