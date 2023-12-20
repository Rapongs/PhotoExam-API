const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
dotenv.config();

// diisi sesuai GCS yang ada di google cloud console, untuk key nya bisa membuat di service account
const storage = new Storage({
  projectId: 'project-rafie-1',
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  },
});

const bucket = storage.bucket('photo_exam_try'); // diisi sesuai nama bucket yang dipakai

module.exports = { bucket, storage };
