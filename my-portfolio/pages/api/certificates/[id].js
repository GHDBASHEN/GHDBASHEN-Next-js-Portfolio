import dbConnect from '../../../lib/dbConnect';
import Certificate from '../../../models/Certificate';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const certificate = await Certificate.findById(id);
        if (!certificate) {
          return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
      } catch {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'PUT':
      try {
        const updatedCertificate = await Certificate.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedCertificate) {
          return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(updatedCertificate);
      } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedCertificate = await Certificate.findByIdAndDelete(id);
        if (!deletedCertificate) {
          return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json({ message: 'Certificate deleted successfully' });
      } catch {
        res.status(500).json({ message: 'Delete failed' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
