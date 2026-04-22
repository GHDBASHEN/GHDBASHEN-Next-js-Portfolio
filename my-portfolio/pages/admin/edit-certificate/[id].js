import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CertificateForm from '../../../components/CertificateForm';

export default function EditCertificate() {
  const router = useRouter();
  const { id } = router.query;
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/certificates/${id}`)
        .then((res) => res.json())
        .then((data) => setCertificate(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!certificate) return <div className="p-8 text-center pt-24">Loading...</div>;

  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Certificate</h1>
      <CertificateForm certificateToEdit={certificate} />
    </div>
  );
}
