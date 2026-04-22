import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [awards, setAwards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch Projects
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Fetch Certificates
    fetch('/api/certificates')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data) => setCertificates(data))
      .catch((error) => console.error("Error fetching certificates:", error));

    // Fetch Awards
    fetch('/api/awards')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data) => setAwards(data))
      .catch((error) => console.error("Error fetching awards:", error));
  }, []);

  const handleDelete = async (id, type) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      const endpoint = type === 'project' ? `/api/projects/${id}` : type === 'certificate' ? `/api/certificates/${id}` : `/api/awards/${id}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (response.ok) {
        if (type === 'project') setProjects(projects.filter((p) => p._id !== id));
        if (type === 'certificate') setCertificates(certificates.filter((c) => c._id !== id));
        if (type === 'award') setAwards(awards.filter((a) => a._id !== id));
      } else {
        alert(`Failed to delete ${type}.`);
      }
    }
  };

  return (
    <div className="container mx-auto p-8 pt-24 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Projects Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <Link href="/admin/add-project" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Add New Project
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                    <button onClick={() => handleDelete(project._id, 'project')} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certificates Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Certificates</h2>
          <Link href="/admin/add-certificate" className="bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600 transition-colors">
              Add New Certificate
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((cert) => (
                <tr key={cert._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => router.push(`/admin/edit-certificate/${cert._id}`)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(cert._id, 'certificate')} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Awards Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Awards</h2>
          <Link href="/admin/add-award" className="bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 transition-colors">
              Add New Award
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Award Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {awards.map((award) => (
                <tr key={award._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{award.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => router.push(`/admin/edit-award/${award._id}`)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(award._id, 'award')} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}