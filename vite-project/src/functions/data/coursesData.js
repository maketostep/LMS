export async function getCourseList() {
  const response = await fetch(
    `${import.meta.env.VITE_AUTH_SERVER_HTTPS}/courses`
  );
  if (!response.ok) {
    console.log("Course data not loaded successfully");
    return [await response.json(), null];
  } else {
    console.log("Course data loaded successfully");
    return [null, await response.json()];
  }
}

export async function getStudentCountByCourse(courseId) {
  const response = await fetch(
    `${import.meta.env.VITE_AUTH_SERVER_HTTPS}/courses/students/${courseId}`
  );
  if (!response.ok) {
    console.log("Student count not loaded successfully");
    return await response.json();
  } else {
    console.log("Student count loaded successfully");
    return await response.json();
  }
}

export async function getCourseById(courseId) {
  return fetch(`/courses/${courseId}`).then((response) => response.json());
}

export async function createCourse(courseData) {
  // courseData = course_name, description, duration, status
  return fetch("/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  }).then((response) => response.json());
}

export async function updateCourse(courseId, updatedCourseData) {
  // updatedCourseData = course_name, description, duration, status
  return fetch(`/courses/${courseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCourseData),
  }).then((response) => response.json());
}
