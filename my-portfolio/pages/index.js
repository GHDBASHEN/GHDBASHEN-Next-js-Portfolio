import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection'; // Import the new section
import ProjectsSection from '../components/ProjectsSection';

export default function HomePage({ projects }) {
  return (
    <div>
      <AboutSection />
      <ServicesSection /> {/* Use the new section here */}
      <ProjectsSection projects={projects} />

      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2025 Your Name. All Rights Reserved.</p>
      </div>
    </div>
  );
}

// Data fetching remains the same
export async function getStaticProps() {
  // ... your existing getStaticProps logic ...
  await dbConnect();
  const result = await Project.find({}).sort({ createdAt: -1 });
  const projects = result.map((doc) => {
    const project = doc.toObject();
    project._id = project._id.toString();
    project.createdAt = project.createdAt.toString();
    Object.keys(project).forEach(key => {
        if (project[key] instanceof Date) {
            project[key] = project[key].toISOString();
        }
    });
    return project;
  });

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
}