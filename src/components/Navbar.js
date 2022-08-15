import React ,{useEffect } from 'react'
import { Link , useLocation, useHistory} from "react-router-dom";


const Navbar = () => {
    // const { userData, setUserData } = useContext(noteContext);


   
    let history = useHistory();
    //Logout
    const handleLogout=()=>{
        
        localStorage.removeItem('token');
        history.push('/login');
    }

//popover
//    console.log(userData)

    

    let location = useLocation();
  useEffect(() => {
        console.log(location.pathname);
  }, [location]);

    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Memory Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-outline-info mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-info mx-2" to="/signup" role="button">SignUp</Link>
                    </form>:<div><button type="button" className="btn btn-outline-info mx-2" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover" >Profile{}</button>
                    <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button></div>}
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Navbar