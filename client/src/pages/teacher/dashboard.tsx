import { useState } from "react";
import { UserMenu } from "@/components/UserMenu";
import { useQuery } from "@tanstack/react-query";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Question, Exam } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function TeacherDashboard() {
  const { data: questions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  const { data: exams, isLoading: examsLoading } = useQuery<Exam[]>({
    queryKey: ["/api/exams"],
  });

  if (questionsLoading || examsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <UserMenu />
      </div>

      <Tabs defaultValue="questions" className="mb-8">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Question Bank</CardTitle>
              <Button>Add Question</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions?.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.title}</TableCell>
                      <TableCell>{question.category}</TableCell>
                      <TableCell>{question.subcategory}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Exams</CardTitle>
              <Button>Create Exam</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Scheduled For</TableHead>
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
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-bold">{questions?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Exams:</span>
                <span className="font-bold">{exams?.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
