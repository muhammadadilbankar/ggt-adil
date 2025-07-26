
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Go Green Technologies Pvt. Ltd.</h3>
            <p className="mb-4">
              A student organization dedicated to fostering innovation and
              knowledge in electronics and electrical engineering.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary" target="_blank">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary" target="_blank">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary" target="_blank">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UC-2azTT3UFPgc8u77x6Rg_A" target="_blank" className="hover:text-primary">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a2.934 2.934 0 00-2.062-2.075C19.738 3.5 12 3.5 12 3.5s-7.738 0-9.437.611a2.934 2.934 0 00-2.061 2.075A30.222 30.222 0 000 12a30.222 30.222 0 00.502 5.814 2.934 2.934 0 002.061 2.075C4.262 20.5 12 20.5 12 20.5s7.738 0 9.437-.611a2.934 2.934 0 002.061-2.075A30.222 30.222 0 0024 12a30.222 30.222 0 00-.502-5.814zM9.75 15.021V8.979L15.5 12l-5.75 3.021z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary">Products</Link>
              </li>
              <li>
                <Link to="/skilling" className="hover:text-primary">Skilling</Link>
              </li>
              <li>
                <Link to="/meditation" className="hover:text-primary">Meditation</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-primary">Events</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-primary">Community</Link>
              </li>
              <li>
                <Link to="/submission" className="hover:text-primary">Submit Project</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">Bharatiya Vidya Bhavan’s</p>
              <p className="mb-2">Sardar Patel Institute of Technology,</p>
              <p className="mb-2">Bhavans Campus, Andheri-W, Mumbai-58</p>
              <p className="mb-2">
                Email: <a href="mailto:gogreenramakrishna@gmail.com" target="_blank" className="hover:text-primary">gogreenramakrishna@gmail.com</a>
              </p>
              <p>
                Phone: <a href="tel: 9137692917 / 9820962870" target="_blank" className="hover:text-primary">9137692917 / 9820962870</a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p>Frontend design assisted by <span className="text-primary hover:underline"><a href="https://lovable.dev/" target="_blank" rel="noopener noreferrer">Lovable.dev</a></span></p>
          <p>Designed and hosted by&nbsp;
          <a className="hover:underline decoration-sky-500" href="https://www.linkedin.com/in/harsh-walavalkar-15232b254?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD6yUQ4BsevDRiXxRHQUS3uTP3y5qr1_voo&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BVvX5V21PRFmg0QCJm6FgXQ%3D%3D" target="_blank" rel="noopener noreferrer">Harsh Walavalkar</a>,&nbsp; 
          <a className="hover:underline decoration-sky-500" href="https://www.linkedin.com/in/muhammad-adil-bankar-946865319?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAFDAPQYB3HjxLRKvbDbwa2VYbvgv7Psbvko&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BB5MKQ7TnT2adrO9otjuzuw%3D%3D" target="_blank" rel="noopener noreferrer">Muhammad Adil Bankar</a>,&nbsp;
          <a className="hover:underline decoration-sky-500" href="https://www.linkedin.com/in/amey-agarwal-5bb56224b/" target="_blank" rel="noopener noreferrer">Amey Agarwal</a>,&nbsp;
          <a  className="hover:underline decoration-sky-500" href="https://www.linkedin.com/in/aaron-mascarenhas-ab315125a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD-8zecB0Qvbzg1BWEK2B_0ev1ZWlT9IF7Q&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BDRmS0LKJRkq%2F2THHFywrhA%3D%3D" target="_blank" rel="noopener noreferrer">Aaron Mascarenhas</a> and&nbsp;
          <a className="hover:underline decoration-sky-500" href="https://www.linkedin.com/in/ria-talsania-b57775292?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEby0zMB8gjcgOKjzOlQ7SeT_S_9qqwwX-I&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BV2Ew0leQSMi8pyru5gpaew%3D%3D" target="_blank" rel="noopener noreferrer">Ria Talsania</a>
          </p>
          <p className="text-sm">Best Viewed in Google Chrome. Turn on Hardware Acceleration or Toggle to close Spline.</p>
          <p>&copy; {new Date().getFullYear()} GoGreen Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
