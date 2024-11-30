import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const Detail = () => {

  const navigate = useNavigate();

  const {id} = useParams("");
  console.log(id);
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
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
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(()=>{
    getData();
  },[])

  const deleteuser = async(id)=>{
    const res2 = await fetch(`/deleteuser/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if(res2.status === 422 || !deletedata){
      console.log("error");
    }else{
      console.log("user deleted");
      navigate("/");
      
    }
  }

  return (
    <div className='container mt-2'>
        <h1 style={{fontWeight:400}}>Welcome Priyanshi Bansal</h1>
        <Card sx = {{maxWidth:600}}>
            <CardContent>
            <div className="add_btn">
                   <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary mx-2"><EditIcon /></button></NavLink> 
                    <button onClick={()=>deleteuser(getuserdata._id)} className="btn btn-danger">< DeleteIcon /></button>
                    </div>
                <div className="row">
                <div className="left col-lg-6 col-md-6 col-12">
                <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' style={{width:50}}/>
                <h3  className='mt-3'>Name: <span >{getuserdata.name}</span></h3>
                <h3 className='mt-3'>Age: <span >{getuserdata.age}</span></h3>
                <p className='mt-3'><MailOutlineIcon /> Email: <span>{getuserdata.email}</span></p>
                <p className='mt-3'><WorkIcon /> Occupation:  <span>{getuserdata.work}</span></p>
                </div>
                <div className="right col-lg-6 col-md-6 col-12">
                   
                    <p className='mt-5'><PhoneAndroidIcon />Mobile: <span>+91 {getuserdata.mobile}</span> </p>
                    <p className='mt-3'><PlaceIcon />Location: <span>{getuserdata.address}</span></p>
                    <p className='mt-3'>Description: <span>{getuserdata.description}</span></p>
                </div>
                </div>
                
                
            </CardContent>
        </Card>
    </div>
  )
}

export default Detail