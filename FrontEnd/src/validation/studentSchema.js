import * as Yup from "yup";

export  const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(22, "Name must not exceed 22 characters")
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters"),
});
