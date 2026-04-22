import CertificateForm from '../../components/CertificateForm';

export default function AddCertificate() {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Certificate</h1>
      <CertificateForm />
    </div>
  );
}
