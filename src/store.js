import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginReducer from "./features/auth/LoginSlice";
import departmentReducer from "./features/department/getAllDepartment";
import addNewDepartmentReducer from "./features/department/addNewDepartment";
import updateDepartmentReducer from "./features/department/updateDepartment";
import deleteDepartmentReducer from "./features/department/deleteDepartment";
import getAllUsersReducer from "./features/user/getAllUsers";
import forgotpasswordReducer from "./features/auth/ForgotPasswordSlice";
import resetpasswordReducer from "./features/auth/ResetPasswordSlice";
import registerReducer from "./features/auth/RegisterSlice";
import { getLeavesReducer } from "./features/leave/getLeaves";
import { getReportReducer } from "./features/leave/getReports";
import requestLeaveReducer from "./features/leave/requestLeave";
import deleteLeaveReducer from "./features/leave/deleteLeave";
import editLeaveReducer from "./features/leave/editLeave";

const reducer = {
  login: loginReducer,
  getAllDepartments: departmentReducer,
  addNewDepartment: addNewDepartmentReducer,
  updateDepartment: updateDepartmentReducer,
  deleteDepartment: deleteDepartmentReducer,
  getAllUsers: getAllUsersReducer,
  forgotPassword: forgotpasswordReducer,
  resetPassword: resetpasswordReducer,
  register: registerReducer,
  getLeaves: getLeavesReducer,
  getReport: getReportReducer,
  requestLeave: requestLeaveReducer,
  deleteLeave: deleteLeaveReducer,
  editLeave: editLeaveReducer,
};

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export default configureStore({
  reducer,
  middleware: [thunk, ...middleware],
});
