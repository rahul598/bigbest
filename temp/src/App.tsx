import { Router, Switch, Route } from "wouter"; // Added Switch for proper routing
import React, { Suspense, lazy } from "react";
import Layout from "./components/layout";
import { Provider } from "react-redux";
import { store } from "./redux/store/store"; 
import "./App.css";

// Lazy Loading Pages
const HomePage = lazy(() => import("./pages/home"));
const AboutPage = lazy(() => import("./pages/about"));
const TuitionServicesPage = lazy(() => import("./pages/tution"));
const MockExamPracticePage = lazy(() => import("./pages/mockexam"));
const HolidayClassesPage = lazy(() => import("./pages/holidayclasses"));
const ConsultancyServicePage = lazy(() => import("./pages/consultancyservice"));
const TraffordInfoPage = lazy(() => import("./pages/trafford"));
const StorePage = lazy(() => import("./pages/store"));
const FAQPage = lazy(() => import("./pages/faq"));
const ContactUsPage = lazy(() => import("./pages/contact"));
const NotFoundPage = lazy(() => import("./pages/notfound"));

function App() {
  console.log("App rendered");

  return (
    <Provider store={store}>
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/tution" component={TuitionServicesPage} />
            <Route path="/mockexam" component={MockExamPracticePage} />
            <Route path="/holidayclasses" component={HolidayClassesPage} />
            <Route path="/consultancyservice" component={ConsultancyServicePage} />
            <Route path="/trafford" component={TraffordInfoPage} />
            <Route path="/store" component={StorePage} />
            <Route path="/faqs" component={FAQPage} />
            <Route path="/contact" component={ContactUsPage} />
            <Route path="*" component={NotFoundPage} /> {/* 404 route */}
          </Switch>
        </Suspense>
      </Layout>
    </Router>
    </Provider>
  );
}

export default App;
