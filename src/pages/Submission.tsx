import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Submission() {
  const { isLoaded, isSignedIn } = useUser(); // ✅ correct usage

  if (!isLoaded) return null; // Prevents flash of content
  if (!isSignedIn) return <RedirectToSignIn />;

  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    branch: "",
    title: "",
    pdfLink: "",
  });
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const { name, uid, branch, title, pdfLink } = formData;

  if (!name || !uid || !branch || !title || !pdfLink) {
    toast({
      title: "Missing information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    setIsSubmitting(false);
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/submissions/mdm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Improved error handling
    if (!response.ok) {
      let errorMessage = "Submission failed";
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
      }
      
      throw new Error(errorMessage);
    }

    // Only parse JSON if we have a successful response
    const result = await response.json();

    toast({
      title: "Submission Successful!",
      description: "Your project has been submitted successfully.",
    });

    setFormData({ name: "", uid: "", branch: "", title: "", pdfLink: "" });
  } catch (error) {
    console.error("Submission error:", error);
    toast({
      title: "Submission Failed",
      description: error instanceof Error ? error.message : "An error occurred while submitting. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Submit Your Project</h1>
            <p className="text-lg max-w-3xl">
              Upload your final project details below. Make sure your PDF Drive link is accessible.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Submission Form</CardTitle>
              <CardDescription>All fields are mandatory.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="uid">UID</Label>
                  <Input
                    id="uid"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="pdfLink">Google Drive PDF Link</Label>
                  <Input
                    id="pdfLink"
                    name="pdfLink"
                    type="url"
                    value={formData.pdfLink}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Project"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}