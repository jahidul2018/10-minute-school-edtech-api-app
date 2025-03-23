const courseService = require("../services/courseService");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses for an instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await courseService.getInstructorCourses(req.user.id);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single course with chapters
exports.getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new chapter to a course
exports.addChapter = async (req, res) => {
  try {
    const course = await courseService.addChapter(req.body.courseId, req.body.chapterData);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Chapter added successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update chapter information
exports.updateChapter = async (req, res) => {
  try {
    const course = await courseService.updateChapter(req.body.courseId, req.body.chapterId, req.body.chapterData);
    if (!course) return res.status(404).json({ message: "Course or Chapter not found" });
    res.json({ message: "Chapter updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a chapter
exports.deleteChapter = async (req, res) => {
  try {
    const course = await courseService.deleteChapter(req.body.courseId, req.body.chapterId);
    if (!course) return res.status(404).json({ message: "Course or Chapter not found" });
    res.json({ message: "Chapter deleted successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload video for a course chapter
exports.uploadChapterVideo = async (req, res) => {
  try {
    const { courseId, chapterId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const course = await courseService.getCourseById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.videoUrl = req.file.location;
    await course.save();

    res.json({ message: "Video uploaded successfully", videoUrl: req.file.location });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll a student in a course
exports.enrollCourse = async (req, res) => {
  try {
    const course = await courseService.enrollCourse(req.params.id, req.user.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
