import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB, disconnectMongoDB } from '@/lib/mongo';
import { TaskModel } from 'mongo/schema';
import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    // TODO: Configure accepted origins
    origin: '*'
  });
  await connectMongoDB();
  if (req.method === 'POST') {
    try {
      const { title, description, status, dueDate, projectId, assigneeId, reporterId } = req.body;
      const newTask = new TaskModel({
        title: title,
        description: description,
        status: status,
        dueDate: dueDate,
        projectId: projectId,
        assigneeId: assigneeId,
        reporterId: reporterId
      });
      const result = newTask.save();
      res.status(200).json({ message: 'Created Task', data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating Task' });
    }
  } else {
    console.log('Method not allowed');
    res.status(405).json({ message: 'Unable to send ' + req.method + ' request to server...' });
  }
  await disconnectMongoDB();
}
