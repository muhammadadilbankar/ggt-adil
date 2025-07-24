
// Mock data for initial implementation

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  image?: string;
  video?: string;
  link?: string;
  approved: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Arduino Uno',
    description: 'Microcontroller board based on the ATmega328P',
    price: 23.99,
    image: 'https://images.pexels.com/photos/2820884/pexels-photo-2820884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 50,
  },
  {
    id: '2',
    name: 'Raspberry Pi 4',
    description: 'Single-board computer with 4GB RAM',
    price: 55.99,
    image: 'https://images.pexels.com/photos/12126197/pexels-photo-12126197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 25,
  },
  {
    id: '3',
    name: 'Soldering Station',
    description: 'Digital soldering iron with temperature control',
    price: 89.99,
    image: 'https://images.pexels.com/photos/6147313/pexels-photo-6147313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 15,
  },
  {
    id: '4',
    name: 'Electronics Toolkit',
    description: 'Complete set of tools for electronics projects',
    price: 49.99,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 30,
  },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Arduino',
    description: 'Learn the basics of Arduino programming and electronics',
    duration: '4 weeks',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/2820884/pexels-photo-2820884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Digital Signal Processing',
    description: 'Understanding and implementing DSP techniques',
    duration: '8 weeks',
    level: 'Advanced',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'PCB Design Fundamentals',
    description: 'Learn to design printed circuit boards from scratch',
    duration: '6 weeks',
    level: 'Intermediate',
    image: 'https://images.pexels.com/photos/6147313/pexels-photo-6147313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Annual Electronics Exhibition',
    date: '2025-06-15',
    location: 'University Main Hall',
    description: 'Showcase your projects at our annual electronics exhibition',
    image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Soldering Workshop',
    date: '2025-05-20',
    location: 'Engineering Lab 2',
    description: 'Learn proper soldering techniques from industry experts',
    image: 'https://images.pexels.com/photos/6147313/pexels-photo-6147313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'IoT Hackathon',
    date: '2025-07-10',
    location: 'Innovation Center',
    description: '24-hour hackathon focused on Internet of Things projects',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Amazing Bluetooth Controlled Bot',
    author: 'Harshal Lade',
    date: '2025-04-02',
    description: 'Exploring the various applications of our Edu-Robo Project!',
    image: '/educar.jpg',
    link: 'https://drive.google.com/file/d/153MpsrfntE0ZMDQEN1yKghgbmuwN0hEY/view?usp=sharing',
    approved: true,
  },
  {
    id: '2',
    title: 'Student Canister Satellite Design',
    author: 'Team Spriha at SPIT',
    date: '2025-03-15',
    description: 'Can-Sat designs by our students taking part in the Intl. US Cansat Competition!',
    image: '/cansat-2024.jpg',
    link: 'https://team-spriha.netlify.app/',
    approved: true,
  },
  {
    id: '3',
    title: 'Solar-Powered Phone Charger',
    author: 'Michael Brown',
    date: '2025-02-28',
    description: 'A DIY solar power bank for charging mobile devices',
    image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://instructables.com/example',
    approved: true,
  },
  {
    id: '4',
    title: 'Automated Plant Watering System',
    author: 'Sarah Wilson',
    date: '2025-04-10',
    description: 'System that monitors soil moisture and waters plants when needed',
    image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    approved: false,
  },
];
