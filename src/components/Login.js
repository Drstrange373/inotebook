import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    const [credentials, setCredentials] = useState({email:'',password:''})
    let history = useNavigate()
    
    const handelSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
          })
          const json = await response.json()
          console.log(json)
          if(json.success){
            // Save the authtoken and redirect
            localStorage.setItem('token',json.authToken)
            history('/')
            props.showAlert("You are logged in!", 'success')
          }
          else{
            props.showAlert(json.error===undefined?'Submit valid email adress and password':json.error, 'danger')
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        
    }

    return (
        <div>
            <form onSubmit={(e)=>{handelSubmit(e)}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} onChange={(e)=>{onChange(e)}} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={(e)=>{onChange(e)}} className="form-control" name="password" id="password" />
                </div>

                <button type='submit' className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
