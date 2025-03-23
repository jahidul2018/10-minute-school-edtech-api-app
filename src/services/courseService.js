const Course = require("../models/Course");

const courseService = {
    createCourse: async (data) => {
        return await Course.create(data);
    },

    getInstructorCourses: async (instructorId) => {
        return await Course.find({ instructor: instructorId }).populate("instructor", "name email");
    },

    getCourseById: async (courseId) => {
        return await Course.findById(courseId).populate("instructor", "name email");
    },

    updateCourse: async (courseId, updateData) => {
        return await Course.findByIdAndUpdate(courseId, updateData, { new: true });
    },

    addChapter: async (courseId, chapterData) => {
        const course = await Course.findById(courseId);
        if (!course) return null;
        course.chapters.push(chapterData);
        await course.save();
        return course;
    },

    updateChapter: async (courseId, chapterId, chapterData) => {
        const course = await Course.findById(courseId);
        if (!course) return null;
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return null;
        Object.assign(chapter, chapterData);
        await course.save();
        return course;
    },

    deleteChapter: async (courseId, chapterId) => {
        const course = await Course.findById(courseId);
        if (!course) return null;
        course.chapters = course.chapters.filter(chapter => chapter._id.toString() !== chapterId);
        await course.save();
        return course;
    },

    deleteCourse: async (courseId) => {
        return await Course.findByIdAndDelete(courseId);
    },

    enrollCourse: async (courseId, studentId) => {
        const course = await Course.findById(courseId);
        if (!course) return null;
        if (!course.studentsEnrolled.includes(studentId)) {
            course.studentsEnrolled.push(studentId);
            await course.save();
        }
        return course;
    },

    uploadChapterVideo: async (courseId, chapterId, videoUrl) => {
        const course = await Course.findById(courseId);
        if (!course) return null;
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return null;
        chapter.videoUrl = videoUrl;
        await course.save();
        return course;
    }
};

module.exports = courseService;
