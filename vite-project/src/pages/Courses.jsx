import React from "react";
import { Link, useLoaderData } from "react-router";

const Courses = () => {
  const courses = useLoaderData();
  return (
    <div>
      <br />
      {courses.map((course) => (
        <li key={course.mission_id}>
          <Link to={`/courses/${course.mission_id}`}>
            {course.mission_name} <br />
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Courses;
