import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';
import Certificate from '../../../models/Certificate';
import Award from '../../../models/Award';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { type, items } = req.body;

    if (!type || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        await dbConnect();

        let Model;
        switch (type) {
            case 'project':
                Model = Project;
                break;
            case 'certificate':
                Model = Certificate;
                break;
            case 'award':
                Model = Award;
                break;
            default:
                return res.status(400).json({ error: 'Invalid type' });
        }

        // Bulk update the order of each item
        const bulkOps = items.map((item, index) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { order: index },
            },
        }));

        await Model.bulkWrite(bulkOps);

        return res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('REORDER API ERROR:', error);
        return res.status(500).json({ error: 'Failed to update order' });
    }
}
