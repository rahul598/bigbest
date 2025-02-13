import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Exam, Subscription } from "@shared/schema";
import { Loader2, Calendar, Book, Trophy, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserMenu } from "@/components/UserMenu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Child {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'pending';
}

const inviteChildSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isInviting, setIsInviting] = useState(false);

  const { data: exams, isLoading: examsLoading } = useQuery<Exam[]>({
    queryKey: ["/api/exams"],
  });

  const { data: subscription } = useQuery<Subscription>({
    queryKey: ["/api/subscriptions", user?.id],
    enabled: !!user,
  });

  const { data: children = [], isLoading: childrenLoading } = useQuery<Child[]>({
    queryKey: ["/api/children"],
    enabled: !!user,
  });

  const form = useForm({
    resolver: zodResolver(inviteChildSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const inviteChildMutation = useMutation({
    mutationFn: async (data: z.infer<typeof inviteChildSchema>) => {
      const res = await apiRequest("POST", "/api/children/invite", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/children"] });
      toast({ title: "Invitation sent successfully" });
      form.reset();
      setIsInviting(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send invitation",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (examsLoading || childrenLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <UserMenu />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Upcoming Exams</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {exams?.filter(e => new Date(e.scheduledFor!) > new Date()).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-primary" />
              <CardTitle>Course Progress</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={65} className="mb-2" />
            <span className="text-sm text-muted-foreground">65% Complete</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <CardTitle>Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">B+</div>
            <span className="text-sm text-muted-foreground">Average Grade</span>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Children Management</CardTitle>
          </div>
          <Dialog open={isInviting} onOpenChange={setIsInviting}>
            <DialogTrigger asChild>
              <Button>Invite Child</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Child</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => inviteChildMutation.mutate(data))} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={inviteChildMutation.isPending}>
                    {inviteChildMutation.isPending ? "Sending Invitation..." : "Send Invitation"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {children.map((child) => (
                <TableRow key={child.id}>
                  <TableCell>{`${child.firstName} ${child.lastName}`}</TableCell>
                  <TableCell>{child.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      child.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {child.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" disabled={child.status === 'active'}>
                      Resend Invite
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{subscription.stripePlanId}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium capitalize">{subscription.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Expires:</span>
                <span className="font-medium">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">No active subscription</p>
              <Button>Subscribe Now</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams?.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>
                    {exam.scheduledFor ? new Date(exam.scheduledFor).toLocaleString() : 'Not scheduled'}
                  </TableCell>
                  <TableCell>{exam.duration} minutes</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={!exam.scheduledFor || new Date(exam.scheduledFor) > new Date()}
                    >
                      Download
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