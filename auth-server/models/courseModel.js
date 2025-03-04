const pool = require("../db");
exports.create = async (course_name, description, duration, status) => {
  const result = await pool.query(
    "INSERT INTO courses (course_name, description, duration, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [course_name, description, duration, status]
  );
  return result.rows[0];
};

exports.findAll = async () => {
  const result = await pool.query("SELECT * FROM courses");
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  return result.rows[0];
};

exports.update = async (id, { course_name, description, duration, status }) => {
  const result = await pool.query(
    "UPDATE courses SET course_name = $1, description = $2, duration = $3, status = $4 WHERE id = $5 RETURNING *",
    [course_name, description, duration, status, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM courses WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

////// Сложные запросы //////
exports.getStudentsCountByCourse = async (course_id) => {
  const result = await pool.query(
    `SELECT COUNT(user_id)
FROM enrollments
LEFT JOIN users ON enrollments.user_id = users.id
WHERE enrollments.course_id = $1 AND users.role = 'student'
`,
    [course_id]
  );
  return result.rows[0].count;
};
