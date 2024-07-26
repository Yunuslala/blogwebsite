import mongoose from 'mongoose';

const uri = 'mongodb+srv://saif:saif@cluster0.rgz6ufo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}
let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await mongoose.connect(uri);

  cachedClient = client;
  return client;
}