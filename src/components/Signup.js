import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password }=credentials;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":"authToken"
            },
            body: JSON.stringify({  name, email, password }),
        });
        const json = await response.json()
        console.log(json);
        if (response.ok) {
            localStorage.setItem('token', json)
            props.showAlert("Account Created Successfully","success")
            navigate("/")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className=' container mt-3'>
        <h2 className='mb-2'>Create an Acccount to use  iNotebook </h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <input type="text" className="form-control" id="Name"  name='name' onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email"  name='email' aria-describedby="emailHelp" onChange={onChange} required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"  name='password' onChange={onChange} required monLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form></div>
    )
}

export default Signup