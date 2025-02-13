import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Users, Award, Video, Clock, CheckCircle, ArrowRight, Menu } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                11Plus Success
              </Link>
              <div className="hidden md:flex items-center space-x-8 ml-12">
                <Link href="#features" className="nav-link">Features</Link>
                <Link href="#courses" className="nav-link">Courses</Link>
                <Link href="#pricing" className="nav-link">Pricing</Link>
                <Link href="#contact" className="nav-link">Contact</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth?tab=login">
                <Button variant="ghost" className="hover:bg-primary/5">Sign In</Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30">Get Started</Button>
              </Link>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Path to Academic Excellence
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Join thousands of successful students achieving their academic goals through our
              comprehensive learning platform and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/20">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose 11Plus Success?</h2>
            <p className="section-subtitle">
              Experience a revolutionary approach to learning with our comprehensive suite of
              features designed to maximize your success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Book />}
              title="Expert-Led Curriculum"
              description="Access carefully crafted study materials aligned with the latest educational standards."
            />
            <FeatureCard
              icon={<Video />}
              title="Interactive Classes"
              description="Learn through engaging live sessions and comprehensive recorded content."
            />
            <FeatureCard
              icon={<Users />}
              title="Community Support"
              description="Join a thriving community of learners and experienced educators."
            />
            <FeatureCard
              icon={<Award />}
              title="Practice Papers"
              description="Prepare thoroughly with our extensive collection of practice materials."
            />
            <FeatureCard
              icon={<Clock />}
              title="Flexible Learning"
              description="Study at your own pace with our adaptive learning platform."
            />
            <FeatureCard
              icon={<CheckCircle />}
              title="Progress Tracking"
              description="Monitor your improvement with detailed analytics and insights."
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Expert Teachers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join our platform today and take the first step towards academic excellence.
          </p>
          <Button size="lg" variant="secondary" className="shadow-xl">
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Study Guides</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#twitter" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="#facebook" className="hover:text-white transition-colors">Facebook</Link></li>
                <li><Link href="#linkedin" className="hover:text-white transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} 11Plus Success. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}