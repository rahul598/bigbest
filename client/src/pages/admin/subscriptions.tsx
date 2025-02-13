import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard } from "lucide-react";
import { Subscription } from "@shared/schema";

export default function SubscriptionsPage() {
  const { data: subscriptions, isLoading } = useQuery<Subscription[]>({
    queryKey: ["/api/admin/subscriptions"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscription Management</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subscriptions</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions?.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.userId}</TableCell>
                  <TableCell>{subscription.stripePlanId}</TableCell>
                  <TableCell>{subscription.status}</TableCell>
                  <TableCell>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
