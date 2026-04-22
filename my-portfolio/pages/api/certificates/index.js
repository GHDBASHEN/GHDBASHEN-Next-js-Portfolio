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
    if (req.method === 'GET') {
        try {
            await dbConnect();
            const certificates = await Certificate.find({}).sort({ createdAt: -1 });
            return res.status(200).json(certificates);
        } catch (error) {
            console.error('API GET ERROR (Certificates):', error);
            return res.status(500).json({ error: 'Failed to fetch certificates' });
        }
    }

    if (req.method === 'POST') {
        await dbConnect();
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error parsing form data' });
            }
            const imageFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
            if (!imageFile) {
                return res.status(400).json({ error: 'No image file uploaded.' });
            }
            try {
                const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
                    folder: "portfolio_certificates",
                });
                const certificateData = {
                    title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
                    issuer: Array.isArray(fields.issuer) ? fields.issuer[0] : fields.issuer,
                    issueDate: Array.isArray(fields.issueDate) ? fields.issueDate[0] : fields.issueDate,
                    certificateUrl: Array.isArray(fields.certificateUrl) ? fields.certificateUrl[0] : fields.certificateUrl,
                    imageUrl: uploadResult.secure_url,
                };
                const newCertificate = await Certificate.create(certificateData);
                return res.status(201).json(newCertificate);
            } catch (uploadError) {
                console.error("API POST ERROR (Certificates):", uploadError);
                return res.status(500).json({ error: 'Image upload failed' });
            }
        });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
