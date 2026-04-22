import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CertificateForm({ certificateToEdit }) {
  const [title, setTitle] = useState(certificateToEdit?.title || '');
  const [issuer, setIssuer] = useState(certificateToEdit?.issuer || '');
  const [issueDate, setIssueDate] = useState(certificateToEdit?.issueDate || '');
  const [certificateUrl, setCertificateUrl] = useState(certificateToEdit?.certificateUrl || '');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (certificateToEdit) {
      const response = await fetch(`/api/certificates/${certificateToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, issuer, issueDate, certificateUrl }),
      });
      if (response.ok) {
        alert('Certificate updated successfully!');
        router.push('/admin');
      } else {
        alert('Failed to update certificate.');
      }
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('issuer', issuer);
      formData.append('issueDate', issueDate);
      formData.append('certificateUrl', certificateUrl);
      formData.append('image', image);

      const response = await fetch('/api/certificates', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Certificate added successfully!');
        router.push('/admin');
      } else {
        alert('Failed to add certificate.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Certificate Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      <div>
        <label htmlFor="issuer" className="block text-sm font-medium text-gray-700">Issuer</label>
        <input type="text" id="issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      <div>
        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">Issue Date</label>
        <input type="text" id="issueDate" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required placeholder="e.g., Oct 2023" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      <div>
        <label htmlFor="certificateUrl" className="block text-sm font-medium text-gray-700">Certificate URL (Optional)</label>
        <input type="url" id="certificateUrl" value={certificateUrl} onChange={(e) => setCertificateUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      {!certificateToEdit && (
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Certificate Image</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-600 hover:file:bg-cyan-100"/>
        </div>
      )}
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors">
        {certificateToEdit ? 'Update Certificate' : 'Add Certificate'}
      </button>
    </form>
  );
}
