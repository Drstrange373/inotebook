import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp(props) {
  const [credentials, setCredentials] = useState({name:'',email:'',password:'', cpassword:''})
  let history = useNavigate()
  const {name, email, password, cpassword} = credentials

  const handelSubmit = async (e)=>{
      e.preventDefault()
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({name, email, password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
          // Save the authtoken and redirect
          localStorage.setItem('token',json.authToken)
          history('/')
          props.showAlert("Account created Successfully", 'success')
        }
        else{
          props.showAlert(json.error===undefined?'Submit valid email adress and password':json.error, 'danger')
        }
  }

  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
      
  }

  return (
    <div className='container'>
      <form onSubmit={handelSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" value={name} className="form-control" id="name" name='name' onChange={onChange} required minLength={5}/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' value={email} className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' value={password} className="form-control" id="password" onChange={onChange} required minLength={5}/>
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={cpassword} id="cpassword" name='cpassword' onChange={onChange} required minLength={5}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
