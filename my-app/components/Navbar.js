import React from 'react'


function Navbar () {
    return ( 
      <div className="navbar navbar-expand-lg bg-black mt-0">
        
      <div className="container-fluid flex justify-center  ">
      
        <a href="./home">Home</a>
        <a href="./fileupload">FileUpload</a>
        <a href="./market">market</a>     
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </div>
    )
}

export default Navbar