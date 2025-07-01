import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Skilling from "./pages/Skilling";
import Meditation from "./pages/Meditation";
import Events from "./pages/Events";
import Community from "./pages/Community";
import Submission from "./pages/Submission";
import ShowcaseProject from "./pages/ShowcaseProject";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import CommunitySubmissionForm from './pages/CommunitySubmissionForm';
import Login from './pages/Login';
import Register from './pages/Register';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';
import AboutCentre from "./pages/AboutCentre";
import Objectives from "./pages/Objectives";
import Gallery from "./pages/Gallery";
import Facilities from "./pages/Facilities";
import SkillDevelopment from "./pages/SkillDevelopment";
import Activities from "./pages/Activities";
import AgriculturalTechnologies from "./pages/AgriculturalTechnologies";
import Donors from "./pages/Donors";
import ContactUs from "./pages/ContactUs";
import DonateUs from "./pages/DonateUs";
import Home from "./pages/Home";

const ClerkProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // or a loader

  return isSignedIn ? children : <RedirectToSignIn />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-centre" element={<AboutCentre />} />
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/skill-development" element={<SkillDevelopment />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/agricultural-technologies" element={<AgriculturalTechnologies />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/donate-us" element={<DonateUs />} />
            <Route path="/meditation/home" element={<Meditation />} />
            <Route path="/login" element={<SignIn routing="path" path="/login" />} />
            <Route path="/register" element={<SignUp routing="path" path="/register" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/skilling" element={<Skilling />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/events" element={<Events />} />
            <Route path="/community" element={<Community />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/showcase-project" element={<ShowcaseProject />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community/submit" 
              element={
                <ProtectedRoute>
                  <CommunitySubmissionForm />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
