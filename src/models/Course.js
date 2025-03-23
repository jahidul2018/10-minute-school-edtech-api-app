const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    price: { type: Number, default: 0 }, // Free or paid course
    chapters: [
      {
        title: { type: String, required: true },
        lessons: [
          {
            title: { type: String, required: true },
            videoUrl: { type: String }, // DigitalOcean Spaces URL
            duration: { type: Number }, // In minutes
            content: { type: String },
            quiz: [
              {
                question: { type: String, required: true },
                options: [{ type: String, required: true }],
                correctAnswer: { type: String, required: true },
              },
            ],
          },
        ],
      },
    ],
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    certificateTemplate: { type: String }, // URL for certificate template
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
