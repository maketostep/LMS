import { Button } from "@mui/material";
import React from "react";
import { Link, useLoaderData } from "react-router";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const courseData = useLoaderData();
  console.log(courseData);
  return (
    <>
      <Button LinkComponent={Link} to="../courses">
        Back
      </Button>
      <h1>Course Details for Course ID: {courseId}</h1>
      <h5>{courseData.description}</h5>
      <span> Name: {courseData.mission_name}</span>
      <br />
      <span>
        Manufacturers:
        <ul>
          {courseData.manufacturers.map((key) => (
            <li>{key}</li>
          ))}
        </ul>
      </span>
      <br />
      <span>
        Payloads ID:
        <ul>
          {courseData.payload_ids.map((key) => (
            <li>{key}</li>
          ))}
        </ul>
      </span>
      <br />
      <span>
        Other links: <br />
      </span>
      {courseData.twitter && (
        <Button LinkComponent="a" href={courseData.twitter} target="_blank">
          Twitter
        </Button>
      )}
      {courseData.website && (
        <Button LinkComponent="a" href={courseData.website} target="_blank">
          Website
        </Button>
      )}
      {courseData.wikipedia && (
        <Button LinkComponent="a" href={courseData.wikipedia} target="_blank">
          Wiki
        </Button>
      )}
      <br />
    </>
  );
};

export default CourseDetails;
