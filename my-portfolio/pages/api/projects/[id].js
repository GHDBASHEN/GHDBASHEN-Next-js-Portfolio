import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET': // To fetch data for the edit form
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'PUT':
      try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
          new: true, // Return the updated document
          runValidators: true, // Run schema validators
        });
        if (!updatedProject) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
      } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Delete failed' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}