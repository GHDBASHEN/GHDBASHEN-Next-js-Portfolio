import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // --- UPDATED FETCH LOGIC WITH ERROR HANDLING ---
    fetch('/api/projects')
      .then((res) => {
        // If the server responds with an error status (like 500), throw an error
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        // Log the error to the browser's console
        console.error("Error fetching projects:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh the list after deleting
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete project.');
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/add-project" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Add New Project
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => router.push(`/admin/edit/${project._id}`)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}