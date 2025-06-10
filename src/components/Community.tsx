import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function Community() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmitClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit a project",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate('/community/submit');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Community Projects
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Explore amazing projects built by our community members. Get inspired and learn from others.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <button
                  onClick={handleSubmitClick}
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Submit Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 