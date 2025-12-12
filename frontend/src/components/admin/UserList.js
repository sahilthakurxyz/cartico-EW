import React, { Fragment, useEffect } from "react";
import "./UserList.css";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import ScreenVisual from "../../ScreenVisual";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";

import {
  adminAllUsersAction,
  deleteUser,
} from "../../redux/actions/userAction";
import {
  deleteUserReset,
  getAllUsersClearError,
  loadUserClearError,
  updateUserClearError,
} from "../../redux/reducers/UserReducer";
const UserList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const greenColor = "greenColor";
  const redColor = "redColor";
  const { users, loading, error } = useSelector((state) => state.adminAllUsers);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.adminUpdateDeleteUser);
  const { error: userError, user: loadUser } = useSelector(
    (state) => state.user
  );
  const deleteUserHandle = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (confirmDelete) {
      if (loadUser._id === id) {
        window.alert(
          "As an admin, you're responsible for maintaining access levels. You're trying to delete you Own Profile, which is not permitted. Please proceed with caution. We're noticing your irresponsible behavior, which may affect your performance."
        );
        return;
      }
      dispatch(deleteUser(id));
    } else {
      return;
    }
  };
  const columns = [
    { field: "id", HeadersName: "User Id", minWidth: 220 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 280,
    },
    {
      field: "role",
      headerName: "Role",

      minWidth: 110,
      cellClassName: (params) => {
        return params.row.role === "admin" ? greenColor : redColor;
      },
    },
    {
      field: "actions",
      HeadersName: "Actions",
      type: "number",
      minWidth: 200,

      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/update/user/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandle(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(getAllUsersClearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(updateUserClearError());
    }
    if (userError) {
      dispatch(loadUserClearError());
    }
    if (isDeleted) {
      alert.success(message);
      dispatch(deleteUserReset());
    }
  }, [dispatch, alert, error, deleteError, isDeleted, message, userError]);
  useEffect(() => {
    dispatch(adminAllUsersAction());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ScreenVisual />
          {deleteLoading && (
            <div className="deleteLoading">
              <div>
                <p>
                  Product deletion in progress. <span>Please wait</span> while
                  the system completes the process...
                </p>
              </div>
            </div>
          )}
          <MetaData title="All Users -- Admin" />
          <div className="productList-main">
            <Sidebar />
            <div>
              <Typography>All Users</Typography>
              {users.length > 0 ? (
                <div className="productList-data-container">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(rows) => rows.id}
                    pageSizeOptions={[10, 100]}
                    disableRowSelectionOnClick
                    className="productListTable"
                  />
                </div>
              ) : (
                <div className="empty-bucket">
                  <div>
                    <ShopTwoIcon />
                    <p>Your Order Container is Empty</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default UserList;
