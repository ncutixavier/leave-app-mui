import * as Yup from "yup";

export const requestLeaveSchema = Yup.object().shape({
  startDate: Yup.string().required("Date is required"),
  type: Yup.string().required("Type is required"),
  numberOfDays: Yup.number().required("Number of days is required"),
  reason: Yup.string(),
});
