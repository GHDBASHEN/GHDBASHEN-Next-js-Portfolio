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
    if (req.method === 'GET') {
        try {
            await dbConnect();
            const awards = await Award.find({}).sort({ order: 1, createdAt: -1 });
            return res.status(200).json(awards);
        } catch (error) {
            console.error('API GET ERROR (Awards):', error);
            return res.status(500).json({ error: 'Failed to fetch awards' });
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
                    folder: "portfolio_awards",
                });

                // Get current max order
                const lastAward = await Award.findOne().sort('-order');
                const nextOrder = lastAward && lastAward.order !== undefined ? lastAward.order + 1 : 0;

                const awardData = {
                    title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
                    organization: Array.isArray(fields.organization) ? fields.organization[0] : fields.organization,
                    year: Array.isArray(fields.year) ? fields.year[0] : fields.year,
                    description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
                    imageUrl: uploadResult.secure_url,
                    order: nextOrder,
                };
                const newAward = await Award.create(awardData);
                return res.status(201).json(newAward);
            } catch (uploadError) {
                console.error("API POST ERROR (Awards):", uploadError);
                return res.status(500).json({ error: 'Image upload failed' });
            }
        });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
