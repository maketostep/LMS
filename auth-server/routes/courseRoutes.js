const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.verifyToken, courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/students/:id", courseController.getStudentsCount);
router.get("/:id", courseController.getCourseById);
router.put("/:id", authMiddleware.verifyToken, courseController.updateCourse);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  courseController.deleteCourse
);

module.exports = router;
