// Add Express.User interface
import { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends User {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      status: string;
    }
  }
}