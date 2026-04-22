import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function ProjectForm({ projectToEdit }) {
  const [name, setName] = useState(projectToEdit?.name || '');
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [projectUrl, setProjectUrl] = useState(projectToEdit?.projectUrl || '');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(projectToEdit?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('projectUrl', projectUrl);
    if (image) {
      formData.append('image', image);
    }

    try {
      const endpoint = projectToEdit 
        ? `/api/projects/${projectToEdit._id}` 
        : '/api/projects';
      
      const method = projectToEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        alert(`Project ${projectToEdit ? 'updated' : 'added'} successfully!`);
        router.push('/admin');
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.message || errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setLoading(false);
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
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Project Image {projectToEdit && '(Optional if not changing)'}
        </label>
        {preview && (
          <div className="mt-2 mb-4 relative h-40 w-full border rounded-lg overflow-hidden bg-gray-50">
             <Image src={preview} alt="Preview" fill className="object-contain" />
          </div>
        )}
        <input 
          type="file" 
          id="image" 
          onChange={handleImageChange} 
          required={!projectToEdit} 
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />
      </div>

       <button 
        type="submit" 
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
       >
        {loading ? 'Processing...' : (projectToEdit ? 'Update Project' : 'Add Project')}
       </button>
    </form>
  );
}