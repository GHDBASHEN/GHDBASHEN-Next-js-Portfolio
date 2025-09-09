import ProjectCard from '../components/ProjectCard';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';

export default function HomePage({ projects }) {
  // ... (the return JSX is the same, no changes needed there)
  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-500 mb-8">Showcasing my latest work and projects.</p>
        <a 
          href="/resume.pdf"
          download="My-Resume.pdf"
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-lg"
        >
          Download My Resume
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

// Fetch data from MongoDB at build time
export async function getStaticProps() {
  await dbConnect();

  // Fetch projects and sort by creation date
  const result = await Project.find({}).sort({ createdAt: -1 });

  // Mongoose returns documents that are not plain objects, so we need to serialize them
  const projects = result.map((doc) => {
    const project = doc.toObject();
    project._id = project._id.toString(); // Convert ObjectId to string
    project.createdAt = project.createdAt.toString(); // Convert Date to string
    return project;
  });

  return {
    props: {
      projects,
    },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}