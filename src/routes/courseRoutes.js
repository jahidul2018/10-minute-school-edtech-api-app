const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Create a new course (Instructor Only)
router.post("/", authMiddleware, courseController.createCourse);

// Get all courses for an instructor
router.get("/instructor", authMiddleware, courseController.getInstructorCourses);

// Get a single course with chapters
router.get("/:id", authMiddleware, courseController.getCourseById);

// Update a course (Instructor Only)
router.put("/:id", authMiddleware, courseController.updateCourse);

// Add a new chapter to a course
router.post("/chapter", authMiddleware, courseController.addChapter);

// Update chapter information
router.put("/chapter", authMiddleware, courseController.updateChapter);

// Delete a chapter
router.delete("/chapter", authMiddleware, courseController.deleteChapter);

// Delete a course (Instructor Only)
router.delete("/:id", authMiddleware, courseController.deleteCourse);

// Enroll a student in a course
router.post("/:id/enroll", authMiddleware, courseController.enrollCourse);

// Upload video for a course chapter
router.post("/chapter/video", authMiddleware, upload.single("video"), courseController.uploadChapterVideo);

module.exports = router;
