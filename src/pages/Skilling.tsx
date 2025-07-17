import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

// Remove mock data import
// import { courses } from "@/data/mockData";

// Define Skilling interface to match your MongoDB schema
interface Skilling {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl?: string; // Add this line
  resourceUrl?: string | null;
  tags: string[];
  published: boolean;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syllabus?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Skilling() {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillings, setSkillings] = useState<Skilling[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  var [titleDict, setTitleDict] = useState({});
  const [selectedSkilling, setSelectedSkilling] = useState<Skilling | null>(null);
  const { toast } = useToast();

  // Fetch skillings from API
  useEffect(() => {
    const fetchSkillings = async () => {
      try {
        setLoading(true)
        // Get token if authentication is needed
        const token = localStorage.getItem("token");

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/skilling/public`)
        // const response = await fetch("http://localhost:5000/api/skilling", {
        //   headers: {
        //     ...(token ? { "Authorization": `Bearer ${token}` } : {})
        //   }
        // });

        // if (!response.ok) {
        //   throw new Error(`Failed to fetch skillings: ${response.status}`);
        // }

        const data = await response.data;
        setSkillings(data);
        console.log("Fetched skillings:", data);
      } catch (error) {
        console.error("Error fetching skillings:", error);
        toast({
          title: "Error",
          description: "Failed to load courses",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSkillings();
  }, [toast]);

  useEffect(() => {
      if (skillings.length > 0) {
        fetchSkillingImages();
        setFlag(true)
      }
    }, [skillings]);

  function cleanString(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
    }
  
    const [flag, setFlag] = useState(false)

    const fetchSkillingImages = async() => {
        if(flag){
            console.log("Skillings:",skillings);
            console.log("Fetching skilling images");
            const token = localStorage.getItem("token");
            console.log("Using token:", token ? "Token found" : "No token found");
        
            if (!token) {
              throw new Error("No authentication token found");
            }
        
            const newDict = {}
        
           await Promise.all(
              skillings.map(async (skilling)=>{
                var key = "skilling";
                var imageIdname = cleanString(skilling.title);
                // console.log("Key",key)
                // console.log("ImageID:",imageIdname)
                try {
              const res = await axios.post(`${import.meta.env.VITE_API_URL}/imageapi/imageCloudinarypublic/publicgetimageURL`, 
                { key, imageIdname },{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              //console.log("API Fetch done")
              //setStatus(`Fetched Image URL: ${res.data.result}`);
              newDict[skilling.title] = res.data.result
              // if(res.data.result != ""){
              //   console.log("image Found")
              // }
              //setImageUrl(res.data.result);
            } catch (err) {
              console.error(err);
              newDict[skilling.title] = "";
              //setStatus('Failed to fetch image');
            }
                //newDict[product.title] = cleanString(product.title);
              })
            );
        
              setTitleDict(newDict)
              setFlag(true)
              console.log("NEWDICT SKILLING:",newDict)
          }
      }
  // Filter skillings based on search term
  const filteredSkillings = skillings.filter((skilling) =>
    skilling.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skilling.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (skillingTitle: string) => {
    toast({
      title: "Enrollment Request",
      description: `You've requested to join "${skillingTitle}". A Google Form will be available for the same shortly.`,
    });
  };

  // View syllabus function
  const viewSyllabus = (skilling: Skilling) => {
    console.log("Selected skilling:", skilling);
    console.log("Syllabus content:", skilling.syllabus);
    setSelectedSkilling(skilling);
  };

  // Group courses by tags for the filter sidebar
  const allTags = Array.from(new Set(skillings.flatMap(skilling => skilling.tags || [])));

  // Generate badge variant based on tag name
  const getBadgeVariant = (tag: string) => {
    const variants = ["default", "secondary", "outline", "destructive"];
    const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return variants[hash % variants.length] as "default" | "secondary" | "outline" | "destructive";
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Electronics Skill Development</h1>
            <p className="text-lg max-w-3xl">
              Enhance your electronics knowledge with our curated courses and workshops.
              From beginner basics to advanced concepts, we offer hands-on learning
              experiences for all skill levels.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <h2 className="text-xl font-bold mb-4">Search & Filter</h2>
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-6"
                />

                {allTags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Filter by Tags</h3>
                    <div className="space-y-2">
                      {allTags.map((tag) => (
                        <div key={tag} className="flex items-center">
                          <Badge variant={getBadgeVariant(tag)}>
                            {tag}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Not sure which course is right for you? Contact our club mentors
                    for personalized guidance.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Request Pop-up",
                      description: "Hi! please contact one of the club mentors or email to ysrao@spit.ac.in to discuss course options.",
                    });
                  }}>
                    Request Guidance
                  </Button>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="md:w-3/4">
              <h2 className="text-2xl font-bold mb-6">Available Courses</h2>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredSkillings.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">No courses matching your search criteria.</p>
                </div>
              ) : (
                    <div className="space-y-6">
                      {filteredSkillings.map((skilling) => {
                        const imageUrl = titleDict[skilling.title]
                      return(
                        <div
                          key={skilling._id}
                          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                        >
                          <div className="md:w-1/3 bg-gray-200 h-64 relative">
                            {(
                              // <img
                              //   src={skilling.imageUrl}
                              //   alt={skilling.title}
                              //   className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              //   onError={(e) => {
                              //     // Fallback if image fails to load
                              //     e.currentTarget.onerror = null;
                              //     e.currentTarget.src = "https://via.placeholder.com/500x300?text=Course+Image";
                              //   }}
                              // />
                            // ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                  {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 mx-auto text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg> */}
                                  {imageUrl &&  (
                                    <img
                                      src={imageUrl}
                                      alt="skilling-image"
                                      className="mt-2 w-full h-24 object-cover rounded"
                                    />
                                  )}
                                  <h4 className="mt-2 font-medium text-gray-600">Course Materials</h4>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-6 md:w-2/3">
                            {/* Title with Difficulty Badge */}
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{skilling.title}</h3>
                              <Badge
                                className={`${skilling.difficulty === 'beginner' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                    skilling.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                      'bg-red-100 text-red-800 hover:bg-red-200'
                                  } border-0`}
                              >
                                {skilling.difficulty.charAt(0).toUpperCase() + skilling.difficulty.slice(1)}
                              </Badge>
                            </div>

                            <p className="text-gray-700 mb-6">
                              {skilling.description}
                            </p>
                           
                            {/* Bottom section with buttons and tags */}
                            <div className="flex flex-wrap items-center justify-between">
                              <div className="flex flex-wrap gap-4 mb-3 md:mb-0">
                                <Button
                                  onClick={() => {
                                    skilling.resourceUrl ?
                                    <></>:handleEnroll(skilling.title)
                                  }}
                                >
                                  <a href={skilling.resourceUrl} target="_blank">Enroll Now</a>
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => viewSyllabus(skilling)}
                                >
                                  View Course Details
                                </Button>
                              </div>

                              {/* Tags in bottom right */}
                              {/* Tags in bottom right - with improved layout */}
                              <div className="flex flex-wrap gap-1.5 justify-end mt-5">
                                {skilling.tags?.length > 3 ? (
                                  <>
                                    {skilling.tags.slice(0, 2).map((tag, index) => (
                                      <Badge key={index} variant={getBadgeVariant(tag)} className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    <Badge variant="outline" className="text-xs">
                                      +{skilling.tags.length - 2} more
                                    </Badge>
                                  </>
                                ) : (
                                  skilling.tags?.map((tag, index) => (
                                    <Badge key={index} variant={getBadgeVariant(tag)} className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      )}
                    </div>
              )}

              {/* Instructor Section */}
              <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Our Instructors</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">JS</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Prof. John Smith</h3>
                      <p className="text-sm text-gray-600">Digital Electronics</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">AT</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Dr. Alice Thomas</h3>
                      <p className="text-sm text-gray-600">Embedded Systems</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">RJ</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Robert Johnson</h3>
                      <p className="text-sm text-gray-600">PCB Design</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">MP</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Maria Parker</h3>
                      <p className="text-sm text-gray-600">IoT Applications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Syllabus Dialog */}
      <Dialog open={!!selectedSkilling} onOpenChange={() => setSelectedSkilling(null)}>
        {selectedSkilling && (
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{selectedSkilling.title} - Syllabus</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Badge
                  className={`${selectedSkilling.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      selectedSkilling.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'} border-0`}
                >
                  {selectedSkilling.difficulty.charAt(0).toUpperCase() + selectedSkilling.difficulty.slice(1)} level
                </Badge>
                Detailed course outline and learning objectives
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Scrollable syllabus container */}
              <div className="max-h-[40vh] overflow-y-auto pr-1">
                <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {selectedSkilling.syllabus || 
                   <span className="text-gray-500 italic">Syllabus not available for this course.</span>}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Resources</h4>
                <Button asChild>
                  <a
                    href={selectedSkilling.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Introduction Video
                  </a>
                </Button>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button onClick={() => setSelectedSkilling(null)} variant="outline">
                  Close
                </Button>
                <Button onClick={() => {
                  handleEnroll(selectedSkilling.title);
                  setSelectedSkilling(null);
                }}>
                  Enroll in Course
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      <Footer />
    </>
  );
}