import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";

export default function ClassesPage() {
  const { data: classes, isLoading } = useQuery({
    queryKey: ["/api/admin/classes"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Classes Management</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Classes</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Class
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="live">
            <TabsList>
              <TabsTrigger value="live">Live Classes</TabsTrigger>
              <TabsTrigger value="recorded">Recorded</TabsTrigger>
            </TabsList>
            <TabsContent value="live">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Upcoming Classes</h3>
                  <div className="space-y-2">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mathematics - Grade 6</p>
                          <p className="text-sm text-muted-foreground">Today at 3:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Start Class
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recorded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  No recorded classes yet.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
