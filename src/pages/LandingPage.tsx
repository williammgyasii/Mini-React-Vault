import { Link,} from "react-router-dom";
import { Github,  Code, Link2 } from "lucide-react";
import { projects } from "../lib/projects";

export default function LandingPage() {
  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Mini Projects Portfolio
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              A collection of interactive web projects built as part of my
              coding refresher journey.
            </p>
            <Link
              to="#projects"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              View Projects
            </Link>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">My Projects</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Click on any project card to view the live demo and interact with
              it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  to={project.link}
                  key={project.id}
                  className="group bg-white h-[35rem] rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col "
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover group-hover:scale-105 w-full h-[30rem] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col items-center w-full">
                    <h3 className="text-xl w-full text-left font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 font-light flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex p-2 bg-gradient-to-r from-teal-200 to-teal-500 rounded-lg text-center items-center justify-center w-full text-white font-medium">
                      <span className="block">View Project</span>
                      <Link2 className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center gap-3 flex flex-col items-center justify-center">
              <h2 className="text-6xl bg-gradient-to-r bg-clip-text text-transparent from-teal-300 to-blue-300 font-bold text-center mb-4">
                About This Portfolio
              </h2>
              <div className="prose prose-emerald lg:prose-lg mx-auto">
                <p>
                  Welcome to my portfolio—a curated collection of mini-projects
                  developed as part of my coding refresher journey. Each project
                  reflects a specific concept or skill I’ve revisited and built
                  upon to sharpen my front-end development expertise.
                </p>
              </div>
              <Link
                to="https://github.com"
                className="inline-flex items-center bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link
                to="/"
                className="text-xl font-bold text-white flex items-center gap-2"
              >
                <Code className="h-6 w-6 text-emerald-400" />
                <span>CodeRefresher</span>
              </Link>
              <p className="mt-2 text-sm text-gray-400">
                A collection of web development mini-projects
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
