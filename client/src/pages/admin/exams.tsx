import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap } from "lucide-react";
import { Exam } from "@shared/schema";

export default function ExamsPage() {
  const { data: exams, isLoading } = useQuery<Exam[]>({
    queryKey: ["/api/admin/exams"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Exam Management</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Exams</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Scheduled For</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams?.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>{exam.description}</TableCell>
                  <TableCell>{exam.duration} minutes</TableCell>
                  <TableCell>{exam.scheduledFor ? new Date(exam.scheduledFor).toLocaleString() : 'Not scheduled'}</TableCell>
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
    </div>
  );
}
