import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';
import Certificate from '../models/Certificate';
import Award from '../models/Award';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import HomeSection from '../components/HomeSection';
import CertificatesSection from '../components/CertificatesSection';
import AwardsSection from '../components/AwardsSection';

export default function HomePage({ projects, certificates, awards }) {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <CertificatesSection certificates={certificates} />
      <AwardsSection awards={awards} />
      <ProjectsSection projects={projects} />

      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2025 GHDBASHEN. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await dbConnect();

  const projectResult = await Project.find({}).sort({ createdAt: 1 });
  const certificatesResult = await Certificate.find({}).sort({ createdAt: -1 });
  const awardsResult = await Award.find({}).sort({ createdAt: -1 });

  const projects = JSON.parse(JSON.stringify(projectResult));
  const certificates = JSON.parse(JSON.stringify(certificatesResult));
  const awards = JSON.parse(JSON.stringify(awardsResult));

  return {
    props: {
      projects,
      certificates,
      awards,
    },
    revalidate: 60,
  };
}