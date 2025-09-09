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
        <p>&copy; 2025 GHDBASHEN. All Rights Reserved.</p>
      </div>
    </div>
  );
}

// Data fetching remains the same
export async function getStaticProps() {
  await dbConnect();

  // This line finds all projects and sorts them by creation date (newest first)
  const result = await Project.find({}).sort({ createdAt: 1 });
  console.log("RAW DATABASE RESULT:", result);
  const projects = JSON.parse(JSON.stringify(result));

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
}