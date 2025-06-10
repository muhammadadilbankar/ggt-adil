// models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    pdfLink: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;