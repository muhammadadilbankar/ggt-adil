
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function Submission() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    video: "",
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!formData.title || !formData.author || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Project Submitted Successfully!",
        description: "Your project has been submitted for review. An administrator will review it soon.",
      });
      
      // Reset form
      setFormData({
        title: "",
        author: "",
        description: "",
        image: "",
        video: "",
        link: "",
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Submit Your Project</h1>
            <p className="text-lg max-w-3xl">
              Share your electronics projects with our community. All submissions
              will be reviewed by an administrator before being published on the
              community page.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-50 p-6">
                <h2 className="text-xl font-bold mb-4">Submission Guidelines</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Project must be original or properly credited</li>
                  <li>Include clear images or videos if possible</li>
                  <li>Provide detailed description</li>
                  <li>Add any relevant links (GitHub, blog, etc.)</li>
                  <li>Keep content appropriate for all ages</li>
                </ul>

                <div className="mt-8">
                  <h3 className="font-semibold mb-2">What happens next?</h3>
                  <p className="text-gray-600 text-sm">
                    After submission, a club administrator will review your project.
                    Once approved, it will appear on the community page for everyone to see!
                  </p>
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title" className="text-base">
                        Project Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="author" className="text-base">
                        Your Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base">
                        Project Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 min-h-32"
                        placeholder="Describe your project, its purpose, components used, and any challenges you faced..."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="image" className="text-base">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Link to an image of your project. Supported formats: JPG, PNG, GIF.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="video" className="text-base">
                        Video URL
                      </Label>
                      <Input
                        id="video"
                        name="video"
                        type="url"
                        value={formData.video}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="https://youtube.com/watch?v=example"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Link to a YouTube or other video demonstrating your project.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="link" className="text-base">
                        Project Link
                      </Label>
                      <Input
                        id="link"
                        name="link"
                        type="url"
                        value={formData.link}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="https://github.com/yourusername/project"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        GitHub, project website, or any other relevant link.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Submitting..." : "Submit Project"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Inspiration</CardTitle>
                <CardDescription>
                  Need ideas for your next project?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Check out our community page for inspiration from fellow members
                  or try one of these beginner-friendly project ideas:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>LED cube with Arduino</li>
                  <li>Raspberry Pi weather station</li>
                  <li>Motion-activated alarm system</li>
                  <li>Digital clock with temperature display</li>
                </ul>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/community">Browse Community Projects</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Our club mentors are here for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Stuck on a project or need technical guidance? Our experienced
                  mentors can help you troubleshoot issues and offer advice.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Mentor Office Hours</h4>
                  <p className="text-sm text-gray-600 mb-1">Tuesday: 2-4 PM (Room E301)</p>
                  <p className="text-sm text-gray-600 mb-1">Thursday: 3-5 PM (Lab 2)</p>
                  <p className="text-sm text-gray-600">Saturday: 10 AM-12 PM (Online)</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Mentorship Request Sent",
                      description: "A club mentor will contact you via email soon.",
                    });
                  }}>
                    Request Mentorship
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
