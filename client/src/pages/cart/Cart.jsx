import React, { useContext, useEffect, useRef, useState } from 'react'
import './cart.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { LowerNav } from '../../components/lowernav/LowerNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { SingleCart } from './SingleCart'
import { BeatLoader, ClipLoader } from 'react-spinners';
import { io } from 'socket.io-client';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'



export const Cart = () => {
    const {user} = useContext(AuthContext)
    const [carts, setCarts] = useState()
    const [load,setLoad] = useState(true)


    //socket io operations
    //socket io
    const socket = useRef()

    // socketio open
    // const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(()=>{
        socket.current = io("ws://localhost:8080")
    },[])
    useEffect(()=>{
        if(user){
        socket.current.emit("addUser", user._id)
        socket.current.on("getusers", (users)=>{
          setOnlineUsers(users)
        })
        }
    },[user?._id])
    console.log(onlineUsers)


    const [code, setCode] = useState(undefined)
    const [codemessage, setMessagecode] = useState()
    const [loadingtop, setLoadingTop] = useState(false)
    useEffect(()=>{
        socket.current.on("getMessage", (data)=>{
            setCode(data.code)
            setMessagecode(data.message)
        })
     },[])

    
 





    //socketio ends here

    const getCartDetaisl = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/getcartdetails/"+user._id)
            setCarts(res.data)
            setLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCartDetaisl()
    },[])

    //gwt user carts
    const [userCart, setUserCart] = useState()
    const getUserCart = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/usercarts/"+user._id)
            setUserCart(res.data)
        }catch(err){

        }
    }
    useEffect(()=>{
        if(user){
            getUserCart()
        }
    },[])
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
    const calculateTotal = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total;
      }

      const [newData,setData] = useState(true)
      const handleRefresh = (id) => {
        // getCartDetaisl()
        const updatedCartItems = carts.filter(item => item.cartid !== id);
        setCarts(updatedCartItems)
      }


      //payment options
      const [selectedPay, setSelectedPay] = useState()

      const setPayOption = (id) => {
        setSelectedPay(id)
      }
      const payOrder = async () => {

        const orderinfo = {
            userid: user._id,
            cart: userCart,
            total: calculateTotal(carts),
            status: "Waiting payment",
            phone: user.phonenumber
        }
        if(selectedPay === "airtel"){
            setLoadingTop(true)
            try{
                const res = await axios.post(process.env.REACT_APP_API_URL+"transaction/airtel",orderinfo)
                // console.log(res)
            }catch(err){

            }
        }
      }
      const navigate = useNavigate()
      useEffect(()=>{
        if(code === "TS"){
            navigate("/completed/")
        }
      },[code])
  return (
    <div className='cart'>
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" />
        </div>}
       {loadingtop &&  <div className="airtelpage">
            {!code && <div className="onloading">
                    <span className="icon"><ClipLoader color="#E3242B" /></span>
                    <span className="word">Waiting for payment...</span>
            </div>}
            {(code === "TF") && <div className="onfaled">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleExclamation} /></span>
                    <span className="failed">Failed: {codemessage} </span>
            </div>}
            {(code === "TS") && <div className="onSuccess">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleCheck} /></span>
                    <span className="failed">Payment received</span>
            </div>}
        </div>}
        <Navbar/>
        <LowerNav/>
        <div className="container">
            <div className="inside">
                <div className="left">
                    <div className="top">
                        <span className="title">Shoping Cart</span>
                        <span className="itemsnumber">24 items</span>
                    </div>
                    <div className="bottom">
                        <div className="title">Items List</div>
                        {carts && <div className="bodyitems">
                            {
                                carts.map((cart,index)=>(
                                    <SingleCart key={index} data={cart} onDeleteItem={handleRefresh} /> 
                                ))
                            }
                        </div>}
                    </div>
                </div>
                <div className="rightt">
                    <div className="righttotal">Total</div>
                    {carts && <div className="rightfigure"><span>MWK </span>{formatNumberWithCommas(calculateTotal(carts))}</div>}
                    <div className="paymentoptions">
                        <div className="title">Payment options</div>
                        <div className="tickarea">
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("airtel")} className="iconpay">
                                {selectedPay === 'airtel' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="wordpay">Airtel Money</span>
                            </span>
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("tnm")} className="iconpay">{selectedPay === 'tnm' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="wordpay">TNM Mpamba</span>
                            </span>
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("std")} className="iconpay">{selectedPay === 'std' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="wordpay">Standard Bank</span>
                            </span>

                        </div>
                    </div>
                    <div className="paymentnow">
                        {selectedPay && <button onClick={()=>payOrder()}>Pay Now</button>}
                        {!selectedPay && <button>select payment method</button>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
