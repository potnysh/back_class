import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import createError from "http-errors";
import multer from "multer";
import path from 'path';
import { MainChapter } from './models/MainChapter';

import {
  getMainChapter,
  getMainChapterById,
  createMainChapter,
  deleteMainChapterById,
  updateMainChapter,
  createSubChapter,
  deleteSubChapter,
  updateSubChapterById
} from "./controllers/mainchapter";

import {
  deleteUser,
  getSession,
  getUsers,
  // lowerUser,
  // promoteUser,
  signIn,
  signUp,
} from "./controllers/auth";
import { verifyToken } from './controllers/verifyToken';

function getAuthRouter() {
  const router = express.Router();

  router.get("/session", getSession);
  router.post("/signup", signUp);
  router.post("/signin", signIn);
  router.get("/", getUsers);
  // router.post("/promote/:id", verifyToken, promoteUser);
  // router.post("/low/:id", verifyToken, lowerUser);
  router.delete("/delete/:id", verifyToken, deleteUser);

  return router;
}

function getMainChapterRouter() {
  const router = express.Router();

  router.get("/", getMainChapter);
  router.get("/:id", getMainChapterById);
  router.post("/", verifyToken, createMainChapter);
  router.post("/update/:id", updateMainChapter);
  router.delete("/:id", deleteMainChapterById);
  router.post("/createSubChapter/:id", createSubChapter);
  router.post("/deleteSubChapter/:id/:subchapterId", deleteSubChapter);
  router.post("/updateSubChapter/:id/:subchapterId", updateSubChapterById);

  return router;
}

const app = express();
const PORT = process.env.PORT || 3001;

config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/files", express.static("files"));

// Налаштування CORS
app.use(
  cors({
    origin: /https?:\/\//,
    credentials: true,
  })
);


mongoose.set('strictQuery', false);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'files'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.post('/api/upload-files/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  try {
    const { name } = req.body;
    const mainChapter = await MainChapter.findById(id);

    if (!mainChapter) {
      return res.status(404).json({ message: 'Розділ не знайдено' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
    }

    const pdfUrl = req.file.filename;
    const newSubchapter = {
      name,
      pdfUrl,
    };

    mainChapter.subchapter.push(newSubchapter);
    await mainChapter.save();

    res.status(201).json({ message: 'Підрозділ створено', subchapter: newSubchapter });
  } catch (error) {
    res.status(500).json({ message: 'Щось пішло не так', error });
  }
});

app.use('/api/auth', getAuthRouter());
app.use('/api/mainchapter', getMainChapterRouter());

app.get('/api/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'files', filename);
  console.log(`Запит на файл: ${filename}`);
  console.log(`Шлях до файлу: ${filePath}`);
  res.sendFile(filePath, err => {
    if (err) {
      console.error('Помилка при надсиланні файлу:', err);
      res.status(404).json({ message: 'Файл не знайдено' });
    }
  });
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const connect = () => {
  mongoose
    .connect(process.env.MONGO, {})
    .then(() => {
      console.log('Підключено до MongoDB');
    })
    .catch((err) => {
      console.error('Помилка підключення до MongoDB:', err);
      throw err;
    });
};

const host = '0.0.0.0';

app.listen(PORT, host, () => {
  connect();
  console.log(`Сервер працює на http://localhost:${PORT}`);
});

export default app;