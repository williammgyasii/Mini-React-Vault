import CheckList from "../pages/ChecklistProject";
import EatnSplit from "../pages/EatnSplit";
import PizzaOrderProject from "../pages/PizzaOrderProject";
import EatNSplitImage from "../../public/images/dan-gold-E6HjQaB7UEA-unsplash.jpg";

type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  component: React.FC;
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
    component: PizzaOrderProject,
  },
  {
    id: 2,
    title: "Checklist",
    description:
      " The Travel Checklist A simple and interactive packing checklist app built with React and Tailwind CSS. It helps users organize and track their travel essentials with features like item status toggling, quantity tracking, and dynamic update",
    image: "../../public/images/marissa-grootes-ck0i9Dnjtj0-unsplash.jpg",
    tags: ["React", "Redux", "Tailwind"],
    link: "/projects/checklist",
    component: CheckList,
  },
  {
    id: 3,
    title: "EatnSplit",
    description:
      "Eat and Split is a simple React + TypeScript app that helps users split restaurant bills with friends. Users can add friends, track balances, and fairly divide expenses after dining together",
    tags: ["React", "Redux", "Tailwind"],
    link: "/projects/eatnsplit",
    component: EatnSplit,
    image: EatNSplitImage,
  },
  // Add the rest of the projects...
];
