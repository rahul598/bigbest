import { Link } from "wouter";

export function DashboardFooter() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LMS Platform. All rights reserved.
          </div>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:text-primary">Terms</a>
            </Link>
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:text-primary">Privacy</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm text-muted-foreground hover:text-primary">Contact</a>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
