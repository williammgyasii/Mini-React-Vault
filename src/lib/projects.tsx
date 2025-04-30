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
    title: "Interactive Calculator",
    description:
      "A JavaScript calculator with theme switching and keyboard support",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "/projects/calculator",
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
