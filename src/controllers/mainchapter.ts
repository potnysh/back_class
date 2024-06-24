import { MainChapter } from "../models/MainChapter"
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const getMainChapter = async(req, res, next) => {
    try {
      const mainChapter = await MainChapter.find({});
      return res.status(200).json({
        mainChapter,
        message: "get chapters",
      })
    } catch(error) {
      res.status(500).json({message: 'something went wrong'});
    }
  }


export const getMainChapterById = async(req, res, next) => {
    const { id } = req.params;
    try {
      const mainChapter = await MainChapter.findOne({_id: id});
      return res.status(200).json({
        mainChapter,
        message: "get computers",
      })
    } catch(error) {
      res.status(500).json({message: 'something went wrong'});
    }
  }

export const createMainChapter = async(req, res, next) => {
    const { name, year, icon} = req.body;
    try {
      const user = await User.findById(req.user.id);
    if(user.status !== "admin") {
      return res.status(403).json({ message: 'Ви не маєте доступу.' });
    }
      console.log(req.user)
      if (!name) {
        return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
      }if (!year) {
        return res.status(400).json({ message: 'Поле "Рік" не може бути пустим' });
      }if (!icon) {
        return res.status(400).json({ message: 'Поле "icon" не може бути пустим' });
      }
      const mainChapter = await new MainChapter({name, year, icon});
      mainChapter.save();
      res.status(200).json({
        mainChapter,
        message: "Розділ було створено"
      })
    } catch (err) {
      console.log(err);
    }
  }

export const updateMainChapter = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(req.user.id);
      if(user.status !== "admin") {
        return res.status(403).json({ message: 'Ви не маєте доступу.' });
      }
      const filter = { _id: id };
      const mainChapterOld = await MainChapter.find(filter)
      if (!mainChapterOld) {
        return res.status(404).json({ message: "Розділ не знайдено" });
      }
  
      const {name, year, icon } = req.body;
      if (name === '') {
        return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
      }if (year === '') {
        return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
      }if (icon === '') {
        return res.status(400).json({ message: 'Поле "icon" не може бути пустим' });
      }
      const update = {
        $set: {
          name,
          year,
          icon
        },
      };
      
      await MainChapter.updateOne(filter, update);
  
      const mainChapter = await MainChapter.findOne(filter);
      
      return res.status(200).json({
        mainChapter,
        message: "Розділ оновлено успішно",
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Виникла помилка при оновлені розділу' });
    }
  };


export const deleteMainChapterById = async (req, res, next) => {
    const { id } = req.params;
    try {

      const user = await User.findById(req.user.id);
      if(user.status !== "admin") {
        return res.status(403).json({ message: 'Ви не маєте доступу.' });
      }

      const deletedMainChapter = await MainChapter.findOneAndDelete({ _id: id });
      if (!deletedMainChapter) {
        return res.status(404).json({ message: "Розділ не знайдено" });
      }
  
      return res.status(200).json({
        message: "Розділ видалено успішно",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Виникла помилка при видаленні розділу' });
    }
  };

  export const createSubChapter = async(req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(req.user.id);
      if(user.status !== "admin") {
        return res.status(403).json({ message: 'Ви не маєте доступу.' });
      }

      const mainChapter = await MainChapter.findById(id);

      if (!mainChapter) {
          return res.status(404).json({ message: "Розділ не знайдено" });
      }

      const { name, pdfUrl } = req.body;

      if (!name) {
          return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
      }

      if (!pdfUrl) {
          return res.status(400).json({ message: 'Поле "Pdf" не може бути пустим' });
      }

      const newSubchapter = {
          name,
          pdfUrl,
      };
      mainChapter.subchapter.push(newSubchapter);

      await mainChapter.save();

      res.status(201).json({ message: "Підрозділ створено", subchapter: newSubchapter });

  } catch (error) {
      res.status(500).json({ message: 'Щось пішло не так', error });
  }
};

export const deleteSubChapter = async (req, res, next) => {
  const { id, subchapterId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if(user.status !== "admin") {
      return res.status(403).json({ message: 'Ви не маєте доступу.' });
    }

      const mainChapter = await MainChapter.findById(id);
      
      if (!mainChapter) {
          return res.status(404).json({ message: "Головний розділ не знайдено" });
      }
      
      const subchapterIndex = mainChapter.subchapter.findIndex(subchapter => subchapter.id === subchapterId);
      console.log(subchapterIndex)
      if (subchapterIndex === -1) {
          return res.status(404).json({ message: "Підрозділ не знайдено" });
      }

      mainChapter.subchapter.splice(subchapterIndex, 1);

      await mainChapter.save();

      res.status(200).json({ message: "Підрозділ успішно видалено" });

  } catch (error) {
      res.status(500).json({ message: 'Щось пішло не так', error });
  }
};

export const updateSubChapterById = async (req, res, next) => {
  const { id, subchapterId } = req.params;
  const { name, pdfUrl } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if(user.status !== "admin") {
      return res.status(403).json({ message: 'Ви не маєте доступу.' });
    }
      // Знаходимо головний розділ за його id
      const mainChapter = await MainChapter.findById(id);

      if (!mainChapter) {
          return res.status(404).json({ message: "Головний розділ не знайдено" });
      }

      // Знаходимо підрозділ за його id
      const subchapter = mainChapter.subchapter.find(sub => sub.id === subchapterId);

      if (!subchapter) {
          return res.status(404).json({ message: "Підрозділ не знайдено" });
      }
      
      if (name === '') {
        return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
      }if (pdfUrl === '') {
        return res.status(400).json({ message: 'Поле "Назва" не може бути пустим' });
      }

      // Оновлюємо дані підрозділу, якщо вони надані в запиті
      if (name) {
          subchapter.name = name;
      }

      if (pdfUrl) {
          subchapter.pdfUrl = pdfUrl;
      }

      // Зберігаємо оновлений головний розділ
      await mainChapter.save();

      res.status(200).json({ message: "Підрозділ успішно оновлено за id" });
    
  } catch (error) {
      res.status(500).json({ message: 'Щось пішло не так', error });
  }
};
