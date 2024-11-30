import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";

const Edit = () => {

  //  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const {updata, setUpdata} = useContext(updatedata);

  const navigate = useNavigate();

  const [val, setVal] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });

  console.log(val);

  const { id } = useParams("");
  console.log(id);

 

  const getData = async () => {
    const res = await fetch(`/getuser/${id}`, {
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
      setVal(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUser = async(e)=>{
    e.preventDefault();

    const {name,email,work,address,mobile,description,age} = val;

    const res2 = await fetch(`/updateuser/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,email,work,address,mobile,description,age
      })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
      alert("Fill the data")
    }else{
      navigate("/")
      setUpdata(data2);
    }
  }

  return (
    <div className="container">
      <NavLink to="/">HomeEdit</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 co-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={val.name}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setVal({
                  ...val,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-3 col-lg-6 co-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              email
            </label>
            <input
              type="email"
              name="email"
              value={val.email}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setVal({
                  ...val,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-3 col-lg-6 co-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={val.age}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setVal({
                  ...val,
                  age: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-3 col-lg-6 co-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Mobile
            </label>
            <input
              type="number"
              name="mobile"
              value={val.mobile}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setVal({
                  ...val,
                  mobile: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-3 col-lg-6 co-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Work
            </label>
            <input
              type="text"
              name="work"
              value={val.work}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setVal({
                  ...val,
                  work: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-3 col-lg-6 co-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={val.address}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setVal({
                  ...val,
                  address: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-3 col-lg-12 co-md-12 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={val.description}
              class="form-control"
              id="exampleInputPassword1"
              cols="30"
              rows="10"
              onChange={(e) => {
                setVal({
                  ...val,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>

          <button type="submit" onClick={updateUser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
