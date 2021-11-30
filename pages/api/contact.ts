import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { DB_CONNECTION_URL } from '../../constants/urls';

type ResponseData = {
  status: 'success' | 'error';
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { method, body } = req;

  if (method === 'POST') {
    const { email, name, message } = body;
    if (
      !email ||
      email.trim().length === 0 ||
      !email.includes('@') ||
      !name ||
      name.trim().length === 0 ||
      !message ||
      message.trim().length === 0
    ) {
      return res
        .status(422)
        .json({ status: 'error', message: 'Invalid Data!' });
    }

    try {
      const client = await MongoClient.connect(DB_CONNECTION_URL);
      const db = client.db();
      await db.collection('messages').insertOne({ name, email, message });
      client.close();
      return res
        .status(201)
        .json({ status: 'success', message: 'Message sent successfully.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to insert message to database!'
      });
    }
  }
};

export default handler;
