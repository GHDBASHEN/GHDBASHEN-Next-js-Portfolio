import dbConnect from '../../../lib/dbConnect';
import Award from '../../../models/Award';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const award = await Award.findById(id);
        if (!award) {
          return res.status(404).json({ message: 'Award not found' });
        }
        res.status(200).json(award);
      } catch {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'PUT':
      try {
        const updatedAward = await Award.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedAward) {
          return res.status(404).json({ message: 'Award not found' });
        }
        res.status(200).json(updatedAward);
      } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedAward = await Award.findByIdAndDelete(id);
        if (!deletedAward) {
          return res.status(404).json({ message: 'Award not found' });
        }
        res.status(200).json({ message: 'Award deleted successfully' });
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
