import StudentItem from './StudentItem';

export default function TemplateList({ students, isAdd, isRemove }) {
  return (
    <div>
      {students.map((student) => (
        <StudentItem key={student.id} isAdd={isAdd} isRemove={isRemove} {...student} />
      ))}
    </div>
  );
}
