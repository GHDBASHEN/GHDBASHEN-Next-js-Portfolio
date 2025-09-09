import ProjectForm from '../../components/ProjectForm';

export default function AddProjectPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add a New Project</h1>
      <ProjectForm />
    </div>
  );
}