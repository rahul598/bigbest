import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { Order } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function OrderHistoryPage() {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: [`/api/users/${user?.id}/orders`],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center mt-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt!).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell className="capitalize">{order.status}</TableCell>
                  </TableRow>
                ))}
                {orders?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}