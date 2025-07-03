import CourseCard from "./CourseCard";

export default function CoursesList({ items, onOpen, onEdit, onDelete }) {
  return (
    <div>
      {items.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
