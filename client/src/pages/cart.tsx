import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, ShoppingCart } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CartItem } from "@shared/schema";

export default function CartPage() {
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch cart items
  const { data: cartItems, isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart/items"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/cart/items");
      if (!res.ok) {
        throw new Error('Failed to fetch cart items');
      }
      return res.json();
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: number) => {
      const res = await apiRequest("DELETE", `/api/cart/items/${itemId}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to remove item');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart/items"] });
      toast({ title: "Item removed from cart" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/checkout");
      return res.json();
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    },
    onError: (error: Error) => {
      toast({
        title: "Checkout failed",
        description: error.message,
        variant: "destructive",
      });
      setIsCheckingOut(false);
    },
  });

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    checkoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {!cartItems?.length ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <h3 className="font-medium">{item.productType === 'exam' ? 'Exam' : 'Subscription'}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCartMutation.mutate(item.id)}
                        disabled={removeFromCartMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleCheckout}
              disabled={checkoutMutation.isPending || isCheckingOut}
              className="w-full md:w-auto"
            >
              {checkoutMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}