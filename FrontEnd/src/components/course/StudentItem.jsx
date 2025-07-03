import { Button } from "antd";

export default function StudentItem({ isAdd, isRemove, ...student }) {
  return (
    <div>
      {student.fullname}
      {isAdd && (
        <Button type="primary" onClick={() => isAdd(student.id)}>
          Add
        </Button>
      )}
      {isRemove && (
        <Button color="danger" variant="solid" onClick={() => isRemove(student.id)}>
          Remove
        </Button>
      )}
    </div>
  );
}
