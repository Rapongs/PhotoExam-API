const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addFiles,
  getFiles,
  getFileById,
  deleteFile,
} = require('../controllers/fileControllers');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/files', upload.array('documents', 2), addFiles);
router.get('/files', getFiles);
router.get('/files/:fileId', getFileById);
router.delete('/files/:fileId', deleteFile);

module.exports = router;
