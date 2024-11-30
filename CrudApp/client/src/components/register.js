import React, { useContext, useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { adddata } from "./context/ContextProvider";



const Register = () => {

  const {udata, setUdata} = useContext(adddata);

  const navigate = useNavigate();
  
  const [val, setVal] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: ""
  })

  console.log(val);
  
   const handleInputData = async(e)=>{

        e.preventDefault();

        const {name,email,age,mobile,work,address,description} = val;

      //  const res = await fetch("https://localhost:8003/register", { agr hum ise ese likhenge toh ye hme error show krega isiliye humne app.js m cors() ka module phle ki import kra diya tha 
      //but hum ise ese define nhi krenge hum jo ye backend ka pathh usko hum ""PROXY M SAVE KRENGE""
        const res = await fetch("/register", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,email,age,mobile,work,address,description
        })
       });

       const data = await res.json();
       console.log(data);

       if(res.status === 422 || !data){
        alert("error");
        console.log("error");
       }else{
        navigate("/");
        setUdata(data)
        console.log("data added")
       }
   }

  return (
    <div className="container">
      Register
      <NavLink to="/">Home</NavLink>
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
            onChange={(e)=>{setVal({
              ...val,
              name : e.target.value
            })}}
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
            onChange={(e)=>{setVal({
              ...val,
              email : e.target.value
            })}}
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
            onChange={(e)=>{setVal({
              ...val,
              age : e.target.value
            })}}
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
            onChange={(e)=>{setVal({
              ...val,
              mobile : e.target.value
            })}}
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
            onChange={(e)=>{setVal({
              ...val,
              work : e.target.value
            })}}
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
            onChange={(e)=>{setVal({
              ...val,
              address : e.target.value
            })}}
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
            onChange={(e)=>{setVal({
              ...val,
              description : e.target.value
            })}}
          >
            </textarea>
        </div>
      
      
        <button type="submit" onClick={handleInputData} class="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
      
    </div>
  );
};

export default Register;
