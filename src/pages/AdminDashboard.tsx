
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { projects, events, products, courses, Project, Event, Product, Course } from "@/data/mockData";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for managing data
  const [pendingProjects, setPendingProjects] = useState<Project[]>([]);
  const [approvedProjects, setApprovedProjects] = useState<Project[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'project' | 'event' | 'product' | 'course' } | null>(null);

  // Load initial data
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }

    // Filter projects based on approval status
    setPendingProjects(projects.filter(project => !project.approved));
    setApprovedProjects(projects.filter(project => project.approved));
    setAllEvents([...events]);
    setAllProducts([...products]);
    setAllCourses([...courses]);
  }, [isAdmin, navigate]);

  // Handle project approval
  const approveProject = (id: string) => {
    setPendingProjects(pendingProjects.filter(project => project.id !== id));
    
    const projectToApprove = pendingProjects.find(project => project.id === id);
    if (projectToApprove) {
      const updatedProject = { ...projectToApprove, approved: true };
      setApprovedProjects([...approvedProjects, updatedProject]);
      
      toast({
        title: "Project Approved",
        description: `"${projectToApprove.title}" is now visible on the community page.`,
      });
    }
  };

  // Handle item deletion
  const handleDelete = () => {
    if (!itemToDelete) return;

    const { id, type } = itemToDelete;

    switch (type) {
      case 'project':
        setPendingProjects(pendingProjects.filter(project => project.id !== id));
        setApprovedProjects(approvedProjects.filter(project => project.id !== id));
        toast({
          title: "Project Deleted",
          description: "The project has been removed permanently.",
        });
        break;
      case 'event':
        setAllEvents(allEvents.filter(event => event.id !== id));
        toast({
          title: "Event Deleted",
          description: "The event has been removed from the events page.",
        });
        break;
      case 'product':
        setAllProducts(allProducts.filter(product => product.id !== id));
        toast({
          title: "Product Deleted",
          description: "The product has been removed from the store.",
        });
        break;
      case 'course':
        setAllCourses(allCourses.filter(course => course.id !== id));
        toast({
          title: "Course Deleted",
          description: "The course has been removed from the skilling page.",
        });
        break;
    }

    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Confirmation before delete
  const confirmDelete = (id: string, type: 'project' | 'event' | 'product' | 'course') => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };

  // Handle adding new items (simplified for demo)
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newEvent: Event = {
      id: `new-${Date.now()}`,
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string || undefined,
    };

    setAllEvents([...allEvents, newEvent]);
    
    toast({
      title: "Event Added",
      description: `"${newEvent.title}" has been added to the events page.`,
    });

    form.reset();
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newProduct: Product = {
      id: `new-${Date.now()}`,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      image: formData.get('image') as string,
      stock: parseInt(formData.get('stock') as string, 10),
    };

    setAllProducts([...allProducts, newProduct]);
    
    toast({
      title: "Product Added",
      description: `"${newProduct.name}" has been added to the products page.`,
    });

    form.reset();
  };

  const handleAddCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newCourse: Course = {
      id: `new-${Date.now()}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      duration: formData.get('duration') as string,
      level: formData.get('level') as 'Beginner' | 'Intermediate' | 'Advanced',
      image: formData.get('image') as string,
    };

    setAllCourses([...allCourses, newCourse]);
    
    toast({
      title: "Course Added",
      description: `"${newCourse.title}" has been added to the skilling page.`,
    });

    form.reset();
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-lg">
              Manage club content, approve projects, and add new items.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs defaultValue="pending" className="space-y-8">
            <TabsList className="grid grid-cols-6 max-w-3xl mx-auto">
              <TabsTrigger value="pending">Pending Projects</TabsTrigger>
              <TabsTrigger value="projects">All Projects</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Pending Projects Tab */}
            <TabsContent value="pending">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Pending Projects</h2>
                
                {pendingProjects.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No pending projects to review.
                  </div>
                ) : (
                  <div className="space-y-8">
                    {pendingProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg overflow-hidden bg-gray-50">
                        <div className="md:flex">
                          {project.image && (
                            <div className="md:w-1/4">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-6 md:w-3/4">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-2">By {project.author} • {new Date(project.date).toLocaleDateString()}</p>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            
                            {project.link && (
                              <p className="mb-2 text-sm">
                                <strong>Link:</strong>{" "}
                                <a 
                                  href={project.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {project.link}
                                </a>
                              </p>
                            )}
                            
                            {project.video && (
                              <p className="mb-4 text-sm">
                                <strong>Video:</strong>{" "}
                                <a 
                                  href={project.video} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {project.video}
                                </a>
                              </p>
                            )}
                            
                            <div className="flex gap-4">
                              <Button 
                                onClick={() => approveProject(project.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve Project
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => confirmDelete(project.id, 'project')}
                                className="border-red-600 text-red-600 hover:bg-red-50"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* All Projects Tab */}
            <TabsContent value="projects">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">All Projects</h2>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...pendingProjects, ...approvedProjects].map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.author}</TableCell>
                        <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            project.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {project.approved ? "Approved" : "Pending"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {!project.approved && (
                              <Button 
                                size="sm" 
                                onClick={() => approveProject(project.id)}
                                className="h-8 bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => confirmDelete(project.id, 'project')}
                              className="h-8 border-red-600 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
                
                {/* Add Event Form */}
                <div className="mb-8 border-b pb-8">
                  <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
                  <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input id="event-title" name="title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" name="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-location">Location</Label>
                      <Input id="event-location" name="location" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-image">Image URL</Label>
                      <Input id="event-image" name="image" type="url" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea id="event-description" name="description" required />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit">Add Event</Button>
                    </div>
                  </form>
                </div>
                
                {/* Events List */}
                <h3 className="text-xl font-semibold mb-4">Current Events</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => confirmDelete(event.id, 'event')}
                            className="h-8 border-red-600 text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
                
                {/* Add Product Form */}
                <div className="mb-8 border-b pb-8">
                  <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-price">Price ($)</Label>
                      <Input id="product-price" name="price" type="number" step="0.01" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-stock">Stock</Label>
                      <Input id="product-stock" name="stock" type="number" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-image">Image URL</Label>
                      <Input id="product-image" name="image" type="url" placeholder="https://example.com/image.jpg" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea id="product-description" name="description" required />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit">Add Product</Button>
                    </div>
                  </form>
                </div>
                
                {/* Products List */}
                <h3 className="text-xl font-semibold mb-4">Current Products</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => confirmDelete(product.id, 'product')}
                            className="h-8 border-red-600 text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>
                
                {/* Add Course Form */}
                <div className="mb-8 border-b pb-8">
                  <h3 className="text-xl font-semibold mb-4">Add New Course</h3>
                  <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="course-title">Course Title</Label>
                      <Input id="course-title" name="title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-duration">Duration</Label>
                      <Input id="course-duration" name="duration" placeholder="e.g. 4 weeks" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-level">Level</Label>
                      <select 
                        id="course-level" 
                        name="level" 
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-image">Image URL</Label>
                      <Input id="course-image" name="image" type="url" placeholder="https://example.com/image.jpg" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="course-description">Description</Label>
                      <Textarea id="course-description" name="description" required />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit">Add Course</Button>
                    </div>
                  </form>
                </div>
                
                {/* Courses List */}
                <h3 className="text-xl font-semibold mb-4">Current Courses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>{course.level}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => confirmDelete(course.id, 'course')}
                            className="h-8 border-red-600 text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Club Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="club-name">Club Name</Label>
                        <Input id="club-name" defaultValue="ElectronNexus Club" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" defaultValue="info@electronnexus.edu" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Project Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive email when new project is submitted
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-green-600 text-green-600 hover:bg-green-50"
                          >
                            Enabled
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Event Reminders</p>
                          <p className="text-sm text-gray-500">
                            Send reminders before events
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-green-600 text-green-600 hover:bg-green-50"
                          >
                            Enabled
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Admin Account</h3>
                    <Button
                      variant="outline"
                      className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                    >
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        toast({
                          title: "This is a demo",
                          description: "In a real app, this would reset all data.",
                        });
                      }}
                    >
                      Reset Website Data
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
