const courseModel = require("../models/courseModel");

exports.createCourse = async (req, res) => {
  try {
    const { course_name, description, duration, status } = req.body;
    const newCourse = await courseModel.create(
      course_name,
      description,
      duration,
      status
    );
    res.status(201).json(newCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при создании курса", error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении курсов", error: error.message });
  }
};

exports.getStudentsCount = async (req, res) => {
  try {
    const count = await courseModel.getStudentsCountByCourse(req.params.id);
    console.log(req.params.id);
    if (count) {
      res.status(200).json({ course_id: req.params.id, studentCount: count });
    } else {
      res.status(404).json({ message: "Курс не найден" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении количества студентов",
      error: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: "Курс не найден" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении курса", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await courseModel.update(req.params.id, req.body);
    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ message: "Курс не найден" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при обновлении курса", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const result = await courseModel.delete(req.params.id);
    if (result) {
      res.status(200).json({ message: "Курс успешно удален" });
    } else {
      res.status(404).json({ message: "Курс не найден" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении курса", error: error.message });
  }
};
