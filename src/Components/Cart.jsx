import React, { useContext,useState } from 'react'
import { usercontext } from '../App'
import { FaRupeeSign } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { BsDiamond } from "react-icons/bs";
import { TbFileLike } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';

function Cart() {
    const{state,dispatch}=useContext(usercontext)

    const [heart, setHeart] = useState(false);
    const [mheart, setMheart] = useState(true);

    const handleremove=(id)=>{
        dispatch({type:"remove",payload:id})
        toast.success("Removed from wishlist",{
          autoClose:1000,
          position:'top-center'
        })

    }
  return (
    <>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-[80%] m-auto mt-20 py-12'>
        {
            state.favs&& state.favs.map((villa,index)=>{
                return(
                    <>
                    <div className="object-cover w-80 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] hover:shadow-[0_10px_70px_rgba(8,_112,_184,_0.7)] m-auto rounded-xl">
                      <img
                        src={villa.imgurl}
                        alt=""
                        className="object-cover h-56 rounded-xl"
                        width={330}
                        height={300}
                      />
    
                      <div>
                        <div className="flex items-center text-xl text-blue-400 mt-2 p-2 justify-between">
                          <div className="flex items-center">
                            <FaRupeeSign />
                            <p>{villa.price}/day</p>
                          </div>
                         <p className='text-red-500'><FaHeart onClick={()=>handleremove(villa.id)}/></p>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xl font-bold">
                          {villa.title}({villa.type})
                        </p>
                        <p className="text-lg font-semibold">{villa.address}</p>
                      </div>
                      <hr className="w-80 border-1 " />
                      <div className="flex  justify-between p-2">
                        <div className="flex items-center gap-1">
                          <IoBedOutline />
                          <p>{villa.beds}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaBath />
                          <p>{villa.bath}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <BsDiamond />
                          <p>{villa.sqft}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )
            })
        }
    </div>

    </>
  )
}

export default Cart
