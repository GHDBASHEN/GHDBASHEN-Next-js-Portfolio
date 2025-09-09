import ProjectForm from '../../../components/ProjectForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the specific project data from the API
      fetch(`/api/projects/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Project not found');
          }
          return res.json();
        })
        .then((data) => {
          // MongoDB uses _id, so we map it to id for the form if needed
          data.id = data._id;
          setProject(data);
        })
        .catch(err => {
          console.error(err);
          // Optionally redirect or show an error message
        });
    }
  }, [id]);

  if (!project) return <p className="text-center mt-8 text-lg">Loading project data...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Project</h1>
      <ProjectForm projectToEdit={project} />
    </div>
  );
}