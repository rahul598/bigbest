import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertUserSchema, UserRole } from "@shared/schema";
import { SiGoogle, SiFacebook } from "react-icons/si";
import { z } from "zod";
import { useEffect } from "react";

type LoginData = {
  email: string;
  password: string;
  username?: string;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  username?: string;
};

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Handle OAuth callback
    const params = new URLSearchParams(window.location.search);
    const tokensParam = params.get("tokens");
    if (tokensParam) {
      try {
        const tokens = JSON.parse(decodeURIComponent(tokensParam));
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Failed to parse tokens:", error);
      }
    }
  }, []);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: UserRole.STUDENT,
    },
  });

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case UserRole.ADMIN:
          setLocation("/admin/dashboard");
          break;
        case UserRole.TEACHER:
          setLocation("/teacher/dashboard");
          break;
        case UserRole.STUDENT:
          setLocation("/student/dashboard");
          break;
        default:
          setLocation("/dashboard");
      }
    }
  }, [user, setLocation]);

  // Get the active tab from URL params
  const params = new URLSearchParams(window.location.search);
  const defaultTab = params.get("tab") === "register" ? "register" : "login";

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to LMS Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        (window.location.href = "/api/auth/google")
                      }
                      className="w-full"
                    >
                      <SiGoogle className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        (window.location.href = "/api/auth/facebook")
                      }
                      className="w-full"
                    >
                      <SiFacebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit((data: LoginData) =>
                        loginMutation.mutate({ ...data, username: data.email }),
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={loginForm.control}
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
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        (window.location.href = "/api/auth/google")
                      }
                      className="w-full"
                    >
                      <SiGoogle className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        (window.location.href = "/api/auth/facebook")
                      }
                      className="w-full"
                    >
                      <SiFacebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(
                        (data: RegisterData) =>
                          registerMutation.mutate({
                            ...data,
                            username: data.email,
                          }),
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={registerForm.control}
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
                        control={registerForm.control}
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
                        control={registerForm.control}
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
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending
                          ? "Creating account..."
                          : "Register"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/Logo-3.png"
            className="w-[200px] m-auto"
          />
          <p className="text-lg text-gray-600 mb-8">
            Access our comprehensive learning platform with features for
            students, teachers, and administrators.
          </p>
          <ul className="text-left space-y-4">
            <li className="flex items-center">
              <span className="mr-2">✓</span> Interactive learning materials
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span> Live and recorded classes
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span> Progress tracking
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span> Exam management
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
