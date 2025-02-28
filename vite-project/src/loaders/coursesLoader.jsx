export const coursesLoader = async () => {
  const response = await fetch(`https://api.spacexdata.com/v3/missions`);

  if (!response.ok) {
    throw new Error("Failed to fetch course data");
  }

  const coursesData = await response.json();
  return coursesData;
};
