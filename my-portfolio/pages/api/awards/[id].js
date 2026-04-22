import dbConnect from '../../../lib/dbConnect';
import Award from '../../../models/Award';
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
            const form = new IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ error: 'Error parsing form data' });
                }

                try {
                    let updateData = {
                        title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
                        organization: Array.isArray(fields.organization) ? fields.organization[0] : fields.organization,
                        year: Array.isArray(fields.year) ? fields.year[0] : fields.year,
                        description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
                    };

                    const imageFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
                    if (imageFile && imageFile.size > 0) {
                        const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
                            folder: "portfolio_awards",
                        });
                        updateData.imageUrl = uploadResult.secure_url;
                    }

                    const updatedAward = await Award.findByIdAndUpdate(id, updateData, {
                        new: true,
                        runValidators: true,
                    });

                    if (!updatedAward) {
                        return res.status(404).json({ message: 'Award not found' });
                    }
                    res.status(200).json(updatedAward);
                } catch (error) {
                    console.error("API PUT ERROR (Awards):", error);
                    res.status(400).json({ message: 'Update failed', error: error.message });
                }
            });
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

