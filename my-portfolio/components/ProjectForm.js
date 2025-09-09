import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProjectForm({ projectToEdit }) {
  const [name, setName] = useState(projectToEdit?.name || '');
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [projectUrl, setProjectUrl] = useState(projectToEdit?.projectUrl || '');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For editing, we send JSON
    if (projectToEdit) {
      const response = await fetch(`/api/projects/${projectToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, projectUrl }),
      });
      if (response.ok) {
        alert('Project updated successfully!');
        router.push('/admin');
      } else {
        alert('Failed to update project.');
      }
    } else { // For creating, we send FormData for the image
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('projectUrl', projectUrl);
      formData.append('image', image);

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Project added successfully!');
        router.push('/admin');
      } else {
        alert('Failed to add project.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>
      <div>
        <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700">Project URL</label>
        <input type="url" id="projectUrl" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      {!projectToEdit && (
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Project Image</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
        </div>
      )}
       <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {projectToEdit ? 'Update Project' : 'Add Project'}
       </button>
    </form>
  );
}