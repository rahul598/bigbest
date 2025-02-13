import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

// Define the form schema
const questionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  questionType: z.enum(['multiple_choice', 'true_false', 'fill_in_blank', 'image_choice']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  options: z.array(z.string()).min(2, 'At least 2 options are required'),
  correctOption: z.number().min(0, 'Correct option is required'),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    ['formula'], // Enable math formulas
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
  formula: true, // Enable the formula module
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'script',
  'list', 'bullet',
  'link', 'image',
  'formula'
];

export function QuestionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: '',
      category: '',
      subcategory: '',
      questionType: 'multiple_choice',
      difficulty: 'easy',
      options: ['', '', '', ''],
      correctOption: 0,
    },
  });

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      const questionData = {
        ...data,
        content,
      };

      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        toast({
          title: "Question created successfully",
        });
        setIsOpen(false);
        form.reset();
        setContent('');
      } else {
        throw new Error('Failed to create question');
      }
    } catch (error) {
      console.error('Failed to create question:', error);
      toast({
        title: "Failed to create question",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      <SelectItem value="true_false">True/False</SelectItem>
                      <SelectItem value="fill_in_blank">Fill in the Blanks</SelectItem>
                      <SelectItem value="image_choice">Image Choice</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="min-h-[200px] border rounded-md p-4">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="h-[150px]"
              />
            </div>

            {form.watch('questionType') === 'multiple_choice' && (
              <div className="space-y-4">
                <FormLabel>Options</FormLabel>
                {form.watch('options').map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`options.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <Input {...field} placeholder={`Option ${index + 1}`} />
                        </FormControl>
                        <input
                          type="radio"
                          name="correctOption"
                          checked={form.watch('correctOption') === index}
                          onChange={() => form.setValue('correctOption', index)}
                          className="w-4 h-4"
                        />
                        <label>Correct</label>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Question</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}