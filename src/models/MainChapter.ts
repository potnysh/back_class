import mongoose from "mongoose";

const MainChapterSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    icon: {
      type: Number,
      required: true,
      
    },
    subchapter: {
        type: [
            {
                name: String,
                pdfUrl: String,
            },
          ],
          default: [],
      },
  });
  
  export const MainChapter = mongoose.model("MainChapter", MainChapterSchema);