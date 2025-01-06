import * as Yup from "yup";

export const TodoValidation = Yup.object().shape({
  title: Yup.string()
    .required("title is required")
    .min(3, "Too short!")
    .max(250, "Title must be at most 250 characters long"),
});
