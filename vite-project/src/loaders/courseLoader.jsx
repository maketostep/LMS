export const courseLoader = async ({ params }) => {
  const { courseId } = params;
  const response = await fetch(
    `https://api.spacexdata.com/v3/missions/${courseId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch course data");
  }

  const courseData = await response.json();
  return courseData;
};
