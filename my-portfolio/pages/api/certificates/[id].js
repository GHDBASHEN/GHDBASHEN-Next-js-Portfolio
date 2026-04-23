import dbConnect from '../../../lib/dbConnect';
import Certificate from '../../../models/Certificate';
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
            const form = new IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ error: 'Error parsing form data' });
                }

                try {
                    let updateData = {
                        title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
                        issuer: Array.isArray(fields.issuer) ? fields.issuer[0] : fields.issuer,
                        issueDate: Array.isArray(fields.issueDate) ? fields.issueDate[0] : fields.issueDate,
                        certificateUrl: Array.isArray(fields.certificateUrl) ? fields.certificateUrl[0] : fields.certificateUrl,
                        description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
                    };

                    const imageFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
                    if (imageFile && imageFile.size > 0) {
                        const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
                            folder: "portfolio_certificates",
                        });
                        updateData.imageUrl = uploadResult.secure_url;
                    }

                    const updatedCertificate = await Certificate.findByIdAndUpdate(id, updateData, {
                        new: true,
                        runValidators: true,
                    });

                    if (!updatedCertificate) {
                        return res.status(404).json({ message: 'Certificate not found' });
                    }
                    res.status(200).json(updatedCertificate);
                } catch (error) {
                    console.error("API PUT ERROR (Certificates):", error);
                    res.status(400).json({ message: 'Update failed', error: error.message });
                }
            });
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

