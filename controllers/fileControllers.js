const { collectionsRef } = require('../db/firebase');
const { v4: uuidv4 } = require('uuid');
const { bucket } = require('../db/cloudStorage');

const addFiles = async (req, res) => {
  try {
    const uploadedFile = req.files;
    if (!uploadedFile || uploadedFile.length === 0) {
      return res.status(400).json({ error: 'File not Found' });
    }

    const uploadedData = [];

    for (const file of uploadedFile) {
      const fileId = uuidv4();
      const fileName = `${fileId}_${file.originalname}`;
      const storageFile = bucket.file(fileName);
      await storageFile.save(file.buffer);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      const fileData = {
        fileId: fileId,
        fileName: file.originalname,
        fileType: file.mimetype,
        storageUrl: publicUrl,
        createdAt: new Date(),
      };

      await collectionsRef.doc(fileId).set(fileData);

      uploadedData.push(fileData);
    }

    res.json({
      message: 'Document successfully uploaded',
      document: uploadedData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'An error occured while uploading document' });
  }
};

const getFiles = async (req, res) => {
  try {
    const querySnapshot = await collectionsRef.get();
    const files = [];

    querySnapshot.forEach((doc) => {
      files.push(doc.data());
    });

    res.json({ files });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching files' });
  }
};

const getFileById = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    const docSnapshot = await collectionsRef.doc(fileId).get();

    if (!docSnapshot.exists) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileData = docSnapshot.data();
    res.json({ file: fileData });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the file' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    await collectionsRef.doc(fileId).delete();

    res.json({ message: 'File successfully deleted' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the file' });
  }
};

module.exports = { addFiles, getFiles, getFileById, deleteFile };
