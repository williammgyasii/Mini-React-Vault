type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};
export const projects: ProjectType[] = [
  {
    id: 1,
    title: "Pizzarella",
    description:
      "A React-based web app that displays a pizza menu from various local restaurants. It showcases my work with dynamic data rendering, component-based architecture, and clean UI design",
    image: "../../public/images/alan-hardman-SU1LFoeEUkk-unsplash.jpg",
    tags: ["JavaScript", "CSS", "HTML", "React"],
    link: "/projects/pizzarella",
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description:
      "Real-time weather app with location search and 5-day forecast",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["React", "API", "Tailwind"],
    link: "/projects/weather",
  },
  // Add the rest of the projects...
];
