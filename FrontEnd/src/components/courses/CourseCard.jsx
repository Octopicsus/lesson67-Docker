import { Button } from "antd";

export default function CourseCard({ onOpen, onEdit, onDelete, ...course }) {
  return (
    <div>
      {course.name}
      <Button type="primary" onClick={() => onOpen(course.id)}>
        Open
      </Button>
      <Button
        type="primary"
        color="cyan"
        variant="solid"
        onClick={() => onEdit(course.id)}
      >
        Edit
      </Button>
      <Button type="primary" danger onClick={() => onDelete(course.id)}>
        Delete
      </Button>
    </div>
  );
}