import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function CertificateForm({ certificateToEdit }) {
  const [title, setTitle] = useState(certificateToEdit?.title || '');
  const [issuer, setIssuer] = useState(certificateToEdit?.issuer || '');
  const [issueDate, setIssueDate] = useState(certificateToEdit?.issueDate || '');
  const [certificateUrl, setCertificateUrl] = useState(certificateToEdit?.certificateUrl || '');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(certificateToEdit?.imageUrl || null);
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
    formData.append('issuer', issuer);
    formData.append('issueDate', issueDate);
    formData.append('certificateUrl', certificateUrl);
    if (image) {
      formData.append('image', image);
    }

    try {
      const endpoint = certificateToEdit 
        ? `/api/certificates/${certificateToEdit._id}` 
        : '/api/certificates';
      
      const method = certificateToEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        alert(`Certificate ${certificateToEdit ? 'updated' : 'added'} successfully!`);
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
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Certificate Image {certificateToEdit && '(Optional if not changing)'}
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
          required={!certificateToEdit} 
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-600 hover:file:bg-cyan-100"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'}`}
      >
        {loading ? 'Processing...' : (certificateToEdit ? 'Update Certificate' : 'Add Certificate')}
      </button>
    </form>
  );
}

