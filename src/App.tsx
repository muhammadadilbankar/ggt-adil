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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
