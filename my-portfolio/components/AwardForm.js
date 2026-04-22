import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function AwardForm({ awardToEdit }) {
  const [title, setTitle] = useState(awardToEdit?.title || '');
  const [organization, setOrganization] = useState(awardToEdit?.organization || '');
  const [year, setYear] = useState(awardToEdit?.year || '');
  const [description, setDescription] = useState(awardToEdit?.description || '');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(awardToEdit?.imageUrl || null);
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
    formData.append('title', title);
    formData.append('organization', organization);
    formData.append('year', year);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const endpoint = awardToEdit 
        ? `/api/awards/${awardToEdit._id}` 
        : '/api/awards';
      
      const method = awardToEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        alert(`Award ${awardToEdit ? 'updated' : 'added'} successfully!`);
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
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Award Image {awardToEdit && '(Optional if not changing)'}
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
          required={!awardToEdit} 
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'}`}
      >
        {loading ? 'Processing...' : (awardToEdit ? 'Update Award' : 'Add Award')}
      </button>
    </form>
  );
}

