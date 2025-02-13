import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function MediaPage() {
  const { data: media, isLoading } = useQuery({
    queryKey: ["/api/admin/media"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Media Management</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Media Library</CardTitle>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="images">
            <TabsList>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="shapes">Shapes</TabsTrigger>
            </TabsList>
            <TabsContent value="images">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Image grid will go here */}
                <div className="text-sm text-muted-foreground">
                  No images uploaded yet.
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shapes">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Shapes grid will go here */}
                <div className="text-sm text-muted-foreground">
                  No shapes uploaded yet.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
