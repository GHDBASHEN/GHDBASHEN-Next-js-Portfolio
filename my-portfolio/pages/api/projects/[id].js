import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const project = await Project.findById(id);
                if (!project) {
                    return res.status(404).json({ message: 'Project not found' });
                }
                res.status(200).json(project);
            } catch {
                res.status(500).json({ message: 'Server error' });
            }
            break;

        case 'PUT':
            const form = new IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ error: 'Error parsing form data' });
                }

                try {
                    let updateData = {
                        name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
                        description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
                        projectUrl: Array.isArray(fields.projectUrl) ? fields.projectUrl[0] : fields.projectUrl,
                    };

                    const imageFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
                    if (imageFile && imageFile.size > 0) {
                        const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
                            folder: "portfolio_projects",
                        });
                        updateData.imageUrl = uploadResult.secure_url;
                    }

                    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
                        new: true,
                        runValidators: true,
                    });

                    if (!updatedProject) {
                        return res.status(404).json({ message: 'Project not found' });
                    }
                    res.status(200).json(updatedProject);
                } catch (error) {
                    console.error("API PUT ERROR (Projects):", error);
                    res.status(400).json({ message: 'Update failed', error: error.message });
                }
            });
            break;

        case 'DELETE':
            try {
                const deletedProject = await Project.findByIdAndDelete(id);
                if (!deletedProject) {
                    return res.status(404).json({ message: 'Project not found' });
                }
                res.status(200).json({ message: 'Project deleted successfully' });
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