import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginReducer from "./features/LoginSlice";
import departmentReducer from "./features/department/getAllDepartment";
import addNewDepartmentReducer from "./features/department/addNewDepartment";
import updateDepartmentReducer from "./features/department/updateDepartment";
import deleteDepartmentReducer from "./features/department/deleteDepartment";
import getAllUsersReducer from "./features/user/getAllUsers";

const reducer = {
  login: loginReducer,
  getAllDepartments: departmentReducer,
  addNewDepartment: addNewDepartmentReducer,
  updateDepartment: updateDepartmentReducer,
  deleteDepartment: deleteDepartmentReducer,
  getAllUsers: getAllUsersReducer,
};

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export default configureStore({
  reducer,
  middleware: [thunk, ...middleware],
});
