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
  // We connect inside each method to ensure the connection is fresh
  // and models are registered correctly.
  
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const projects = await Project.find({}).sort({ createdAt: -1 });
      return res.status(200).json(projects);
    } catch (error) {
      console.error('API GET ERROR:', error);
      return res.status(500).json({ error: 'Failed to fetch projects' });
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
          folder: "portfolio_projects",
        });
        const projectData = {
          name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
          description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
          projectUrl: Array.isArray(fields.projectUrl) ? fields.projectUrl[0] : fields.projectUrl,
          imageUrl: uploadResult.secure_url, 
        };
        const newProject = await Project.create(projectData);
        return res.status(201).json(newProject);
      } catch (uploadError) {
        console.error("API POST ERROR:", uploadError);
        return res.status(500).json({ error: 'Image upload failed' });
      }
    });
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}