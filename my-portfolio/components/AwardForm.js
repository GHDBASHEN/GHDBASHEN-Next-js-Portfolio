import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AwardForm({ awardToEdit }) {
  const [title, setTitle] = useState(awardToEdit?.title || '');
  const [organization, setOrganization] = useState(awardToEdit?.organization || '');
  const [year, setYear] = useState(awardToEdit?.year || '');
  const [description, setDescription] = useState(awardToEdit?.description || '');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (awardToEdit) {
      const response = await fetch(`/api/awards/${awardToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, organization, year, description }),
      });
      if (response.ok) {
        alert('Award updated successfully!');
        router.push('/admin');
      } else {
        alert('Failed to update award.');
      }
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('organization', organization);
      formData.append('year', year);
      formData.append('description', description);
      formData.append('image', image);

      const response = await fetch('/api/awards', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Award added successfully!');
        router.push('/admin');
      } else {
        alert('Failed to add award.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Award Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"/>
      </div>
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
        <input type="text" id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"/>
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
        <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} required placeholder="e.g., 2023" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"></textarea>
      </div>
      {!awardToEdit && (
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Award Image</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100"/>
        </div>
      )}
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
        {awardToEdit ? 'Update Award' : 'Add Award'}
      </button>
    </form>
  );
}
