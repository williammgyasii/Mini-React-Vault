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
    title: "Checklist",
    description:
      " The Travel Checklist A simple and interactive packing checklist app built with React and Tailwind CSS. It helps users organize and track their travel essentials with features like item status toggling, quantity tracking, and dynamic update",
    image: "../../public/images/marissa-grootes-ck0i9Dnjtj0-unsplash.jpg",
    tags: ["React", "Redux", "Tailwind"],
    link: "/projects/checklist",
  },
  // Add the rest of the projects...
];
