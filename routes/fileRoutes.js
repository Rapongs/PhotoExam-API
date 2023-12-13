const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addFiles,
  getFiles,
  getFileById,
  deleteFile,
} = require('../controllers/fileControllers');
const { verifyToken } = require('../db/firebase');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/files', verifyToken, upload.array('documents', 2), addFiles);
router.get('/files', verifyToken, getFiles);
router.get('/files/:fileId', verifyToken, getFileById);
router.delete('/files/:fileId', verifyToken, deleteFile);

module.exports = router;
