import React, { useEffect, useState, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { adddata, deletedata, updatedata } from "./context/ContextProvider";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const {udata, setUdata} = useContext(adddata);
  const {updata, setUpdata} = useContext(updatedata);
  const {deldata, setDeldata} = useContext(deletedata);

  const getData = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDeldata(deletedata)
      getData();
    }
  };

  return (
    <>
    {
      udata ? 
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{udata.name}</strong> name user added successfully!.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      </> : null
    }
    {
      updata ? 
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{updata.name}</strong> name User updated successfully!.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      </> : null
    }
    {
      deldata ? 
      <>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{deldata.name}</strong> name User deleted successfully!.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      </> : null
    }
      

      <div>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <NavLink to="/register" className="btn btn-primary">
                Add Data
              </NavLink>
            </div>
            <table class="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">id</th>
                  <th scope="col">Username</th>
                  <th scope="col">email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {getuserdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.mobile}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`view/${element._id}`}>
                            <button className="btn btn-success">
                              <RemoveRedEyeIcon />
                            </button>
                          </NavLink>

                          <NavLink to={`edit/${element._id}`}>
                            <button className="btn btn-primary">
                              <EditIcon />
                            </button>
                          </NavLink>
                          <button
                            onClick={() => deleteuser(element._id)}
                            className="btn btn-danger"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
