import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const projects = await Project.find({}).sort({ createdAt: -1 });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Server error fetching projects' });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      // --- ⚠️ IMPORTANT: Production File Upload Warning ⚠️ ---
      // This logic saves files to the local server filesystem.
      // This WILL NOT WORK on serverless platforms like Vercel.
      // For production, you MUST upload to a cloud storage service like
      // Cloudinary, AWS S3, or similar, and save the returned URL.
      // -----------------------------------------------------------
      const imageFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
      if (!imageFile) {
        return res.status(400).json({ error: 'No image file uploaded.' });
      }

      const oldPath = imageFile.filepath;
      const newFileName = `${Date.now()}_${imageFile.originalFilename}`;
      const newPath = path.join(process.cwd(), 'public/uploads', newFileName);

      try {
        fs.copyFileSync(oldPath, newPath);
        fs.unlinkSync(oldPath);
      } catch (copyError) {
        return res.status(500).json({ error: 'Error saving uploaded file' });
      }
      
      const projectData = {
        name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
        description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
        projectUrl: Array.isArray(fields.projectUrl) ? fields.projectUrl[0] : fields.projectUrl,
        imageUrl: `/uploads/${newFileName}`,
      };

      try {
        const newProject = await Project.create(projectData);
        res.status(201).json(newProject);
      } catch (dbError) {
        res.status(400).json({ error: 'Database error creating project', details: dbError.message });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}