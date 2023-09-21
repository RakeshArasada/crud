import React, { useState,useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function DriverEdit() {
    const{driverID}=useParams();

    useEffect(()=>{
        fetch("http://localhost:8000/driver/"+driverID).then((res)=>{
            return res.json();
        }).then((resp)=>{
            idchange(resp.id);
            namechange(resp.name); 
            emailchange(resp.email);
            phonechange(resp.phone);
            addresschange(resp.address);
            activechange(resp.isactive);
        }).catch((err)=>{
            console.log(err.message);
        })
    });

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[address,addresschange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false)
    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        const drivdata=({id,name,email,phone,address,active})
        fetch("http://localhost:8000/driver",{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(drivdata)
        }
        ).then((res)=>{
            alert('Saved Successfully')
            navigate('/')
        }).catch((err)=>{
            console.log(err.message)
        })
    }
  return (
    <div>
        <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
                <form className='container' onSubmit={handlesubmit}>

                    <div className='card' style={{"textAlign":"left"}}>
                        <div className='card-title'>
                            <h2>Driver Update</h2>
                        </div>
                        <div className='card-body'>
                            <div className='row'>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className='form-control'></input>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className='form-control'></input>
                                        
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input required value={email} onChange={e=>emailchange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Phone number</label>
                                        <input required value={phone} onChange={e=>phonechange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Address</label>
                                        <input required value={address} onChange={e=>addresschange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-check'>
                                        <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className='form-check-input' />
                                            <label className='form-check-label'>Is Active</label>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button type="submit" className='btn btn-success'>Save</button>
                                        <Link to="/" className='btn btn-danger'>Back</Link>
                                    </div>

                                </div>

                            </div> 
                        </div>
                    </div>
                </form>
        </div>
        </div>
    </div>
  )
}

export default DriverEdit