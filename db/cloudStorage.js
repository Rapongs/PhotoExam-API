const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
dotenv.config();

// diisi sesuai GCS yang ada di google cloud console, untuk key nya bisa membuat di service account
const storage = new Storage({
  projectId: 'project-rafie-1',
  key: './storageKey.json',
});

const bucket = storage.bucket('photo_exam_try');  // diisi sesuai nama bucket yang dipakai

module.exports = { bucket, storage };
