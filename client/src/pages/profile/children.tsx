import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Download } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const addChildSchema = z.object({
  email: z.string().email("Invalid email format"),
  relationship: z.string().min(1, "Relationship is required"),
});

export default function ChildrenPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      email: "",
      relationship: "",
    },
  });

  // Fetch children
  const { data: children, isLoading: childrenLoading } = useQuery({
    queryKey: ["/api/children"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/children");
      return res.json();
    },
  });

  // Fetch child's exam results
  const { data: examResults, isLoading: examLoading } = useQuery({
    queryKey: ["/api/children/exams", selectedChildId],
    queryFn: async () => {
      if (!selectedChildId) return null;
      const res = await apiRequest("GET", `/api/children/${selectedChildId}/exams`);
      return res.json();
    },
    enabled: !!selectedChildId,
  });

  // Fetch child's progress reports
  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ["/api/children/reports", selectedChildId],
    queryFn: async () => {
      if (!selectedChildId) return null;
      const res = await apiRequest("GET", `/api/children/${selectedChildId}/reports`);
      return res.json();
    },
    enabled: !!selectedChildId,
  });

  const addChildMutation = useMutation({
    mutationFn: async (data: z.infer<typeof addChildSchema>) => {
      const res = await apiRequest("POST", "/api/children", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/children"] });
      toast({ title: "Child added successfully" });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add child",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeChildMutation = useMutation({
    mutationFn: async (childId: number) => {
      await apiRequest("DELETE", `/api/children/${childId}`);
    },
    onSuccess: (_, childId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/children"] });
      toast({ title: "Child removed successfully" });
      if (selectedChildId === childId) {
        setSelectedChildId(null);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove child",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Children List */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>My Children</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => addChildMutation.mutate(data))}
                    className="space-y-4 mb-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Child's Email</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter child's email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Parent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={addChildMutation.isPending}
                    >
                      {addChildMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Add Child
                    </Button>
                  </form>
                </Form>

                {childrenLoading ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {children?.map((child: any) => (
                      <div
                        key={child.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedChildId === child.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedChildId(child.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {child.firstName} {child.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {child.email}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeChildMutation.mutate(child.id);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Child Details */}
          <div className="md:col-span-2">
            {selectedChildId ? (
              <Tabs defaultValue="exams" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="exams">Exam Results</TabsTrigger>
                  <TabsTrigger value="reports">Progress Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="exams">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exam Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {examLoading ? (
                        <div className="flex justify-center p-4">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Exam Name</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {examResults?.map((result: any) => (
                              <TableRow key={result.id}>
                                <TableCell>{result.examName}</TableCell>
                                <TableCell>
                                  {new Date(result.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{result.score}%</TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      result.status === "passed"
                                        ? "bg-green-100 text-green-800"
                                        : result.status === "failed"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {result.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {result.pdfUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => window.open(result.pdfUrl)}
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Download PDF
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports">
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {reportsLoading ? (
                        <div className="flex justify-center p-4">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Report Type</TableHead>
                              <TableHead>Period</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Performance</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {reports?.map((report: any) => (
                              <TableRow key={report.id}>
                                <TableCell>{report.type}</TableCell>
                                <TableCell>{report.period}</TableCell>
                                <TableCell>{report.subject}</TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      report.performance === "excellent"
                                        ? "bg-green-100 text-green-800"
                                        : report.performance === "good"
                                        ? "bg-blue-100 text-blue-800"
                                        : report.performance === "average"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {report.performance}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <User className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Select a child</p>
                  <p className="text-sm text-muted-foreground">
                    Choose a child from the list to view their exam results and
                    progress reports
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}