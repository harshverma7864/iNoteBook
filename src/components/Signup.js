import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';


const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "", fpassword:""}) 
    let history = useHistory();

    const handleSubmit=async(e) =>{
        e.preventDefault();
        const {name , email , password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name , email , password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Saving the auth token  and redirecting to the content
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Successfully Created","info");


        }
        else{
            // alert("Invalid credentials");
            props.showAlert("Invalid Credentials","warning");
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Good Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="email" className="form-control"  name="email" id="email" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  name="password" id="password" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  name="fpassword" id="fpassword" onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
