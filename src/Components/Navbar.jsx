import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

function Navbar() {
  const [ham, setHam] = useState(false);
  const [cross,setCross]=useState(false)
  const [mham,setMham]=useState(true)
  return (
    <>
      <div className="lg:flex  justify-between px-4  md:flex sm:hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] py-2   w-[100%] fixed top-0 z-50 items-center bg-white">
        <div className="flex items-center gap-2">
          <img src={"./Logonuevo.jpeg"} alt="" width={60} />
          <h1 className="text-xl font-bold text-cyan-600">Rental Stay</h1>
        </div>
        <div className="flex gap-5 h-10  ">
          <button className="text-lg font-semibold border-2 px-4 rounded-lg text-cyan-600">
            Login
          </button>
          <button className="text-lg font-semibold border-2 px-4 rounded-lg text-cyan-600">
            Signup
          </button>
        </div>
      </div>
      <div className="lg:hidden md:hidden sm:visible px-4">
        <div className="text-4xl text-cyan-600 mt-4">
         {mham&& <GiHamburgerMenu onClick={()=>{setHam(true),setCross(true),setMham(false)}}/>}
          {cross&&<ImCross onClick={()=>{setMham(true),setHam(false),setCross(false)}}/>}
        </div>
        {ham && (
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <img src={"./Logonuevo.jpeg"} alt="" width={60} />
              <h1 className="text-xl font-bold text-cyan-600">Rental Stay</h1>
            </div>
            <div className="flex flex-col gap-5 mt-6">
              <button className="text-lg font-semibold border-2 px-4 rounded-lg text-cyan-600">
                Login
              </button>
              <button className="text-lg font-semibold border-2 px-4 rounded-lg text-cyan-600">
                Signup
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
