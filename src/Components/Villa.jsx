import React, { useContext, useState } from "react";
import { resntdata } from "../Data";
import { FaRupeeSign } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { BsDiamond } from "react-icons/bs";
import { TbFileLike } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { usercontext } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Villa() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [filtera, setFiltera] = useState(resntdata);
  const [heart, setHeart] = useState([]);

  const { state, dispatch } = useContext(usercontext);
  const navigate = useNavigate();

  const handlesubmit = () => {
    // console.log(location, price, type);
    const onfilter = resntdata;
    const tprice = price.split("-");
    const price1 = Number(tprice[0]);
    const price2 = Number(tprice[1]);
    let fdata;
    if (location) {
      fdata = onfilter.filter(
        (item) =>
          item.address.split(",")[2].toLowerCase() == location.toLowerCase()
      );
    }
    if (price) {
      fdata = onfilter.filter(
        (item) => item.price >= price1 && item.price <= price2
      );
    }
    if (type) {
      fdata = onfilter.filter((item) => item.type.toLowerCase() == type);
    }
    if (location && price && type) {
      fdata = onfilter.filter((item) => {
        return (
          item.address.split(",")[2].toLowerCase() == location.toLowerCase() &&
          item.price >= price1 &&
          item.price <= price2 &&
          item.type.toLowerCase() == type
        );
      });
    } else {
      setFiltera([]);
    }

    // console.log(fdata);
    setFiltera(fdata);
    setLocation("");
    setPrice("");
    setType("");
  };
  const handleadd = (id) => {
    // console.log(id);

    const favadd = filtera.filter((item, index) => {
      return item.id === id;
    });

    console.log(favadd[0]);
    dispatch({ type: "addfav", payload: favadd[0] });
    toast.success("added to wishlist", {
      autoClose: 1000,
      position: "top-center",
    });
  };

  const handleremove = (id) => {
    dispatch({ type: "remove", payload: id });
    toast.success("Removed from wishlist", {
      autoClose: 1000,
      position: "top-center",
    });
  };

  return (
    <>
      <div>
        <div className="mt-36 w-[85%] m-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">
              Search Propertien For Rent
            </h1>
            <p className="text-3xl font-semibold">
              <Link to="/cart">
                <TbFileLike />
              </Link>
            </p>
          </div>
          <div>
            <div className="flex lg:flex-row  justify-between  mt-10 text-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-5 rounded-lg sm:flex-col sm:gap-y-6 ">
              <input
                type="text"
                placeholder="Enter location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="outline-none"
              />
              <input type="date" className="outline-none" />
              <select
                name=""
                id=""
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none"
              >
                <option value="">Select Price</option>
                <option value="0-500">0-500</option>
                <option value="500-1000">500-1000</option>
                <option value="1000-1500">1000-1500</option>
                <option value="1500-2000">1500-2000</option>
                <option value="2000-2500">2000-2500</option>
                <option value="2500-3000">2500-3000</option>
              </select>
              <select
                name=""
                id=""
                value={type}
                className="outline-none"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="farm-house">Farm House</option>
                <option value="outdore">Outdore</option>
              </select>
              <button
                className="bg-cyan-400 px-2 py-1 font-bold rounded-lg"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-20 w-[95%] m-auto mt-10 py-12">
          {filtera ? (
            filtera.map((villa, index) => {
              const isliked = state.favs.some((fav) => fav.id === villa.id);
              return (
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
                        <button>
                          {isliked ? (
                            <p onClick={() => handleremove(villa.id)}>❤️</p>
                          ) : (
                            <FaRegHeart onClick={() => handleadd(villa.id)} />
                          )}
                        </button>
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
              );
            })
          ) : (
            <h1 className="text-3xl font-bold text-red-600">
              Oops! Something went wrong
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Villa;
