import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  assignStudentAsync,
  getCourse,
} from "../../store/features/courseSlice";
import { selectAll } from "../../store/selectors/studentsSelectors";
import { getAllStudents } from "../../store/features/studentsSlice";
import TemplateList from "./TemplateList";

export default function CoursePage() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourse(courseId));
    dispatch(getAllStudents());
  }, [courseId, dispatch]);

  const allStudents = useSelector(selectAll);

  const handleAddStudent = (studentId) => {
    dispatch(assignStudentAsync({ courseId, studentId }));
  };

  const handleRemoveStudent = () => {
    //---TODO---
  };

  const courseStudents = allStudents.filter(
    (student) => course.students && course.students.includes(student.id)
  );

  const availableStudents = allStudents.filter(
    (student) => !course.students || !course.students.includes(student.id)
  );

  return (
    <div>
      <h3>Course: {course.name}</h3>
      <p>Description: {course.description}</p>
      <p>Start date: {course.startDate}</p>

      <h4>Course students:</h4>
      {courseStudents.length > 0 ? (
        <TemplateList students={courseStudents} />
      ) : (
        <p>N/A</p>
      )}

      <h4>Available students:</h4>
      {availableStudents.length > 0 ? (
        <TemplateList students={availableStudents} isAdd={handleAddStudent} />
      ) : (
        <p>No Available</p>
      )}
    </div>
  );
}
