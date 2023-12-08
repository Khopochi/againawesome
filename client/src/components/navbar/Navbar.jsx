import React, { useContext, useEffect, useState } from 'react';
import './navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
    //navigation
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [count,setCount] = useState(0)
    const getCount = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/countitems/"+user._id)
            setCount(res.data.numberOfItemsInCart)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCount()
    },[])
  return (
    <div className="navbar">
        <div className="upperDiv">
            <div className="logoDiv">
                    JiaBaiLi supermarket
            </div>
            <div className="searchDiv">
                <input type="text" placeholder='Search your item...' className="search" />
                <div className="searchIcon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className="toolsDiv">
                <div className="country">
                    <div className="flag">
                        <span className="fi fi-mw"></span>
                    </div>
                    <div className="currency">
                        <div className="malawi">
                            Malawi,
                        </div>
                        <div className="mwk">
                            MWK
                        </div>
                    </div>
                </div>
                <div className="register">
                    <div className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    {!user && <div className="words">
                        <div className="welcome">
                                Welcome,
                        </div>
                        <div className="signin">
                                 <span onClick={()=>navigate("/login/")} className="text1">Sign in</span> or <span onClick={()=>navigate("/register/")} className="text2">Register</span> 
                        </div>
                    </div>}
                    {user && <div className="words">
                        <div className="welcome">
                                {user.firstname},
                        </div>
                        <div className="signin">
                                 <span onClick={()=>navigate("/myorders/")} className="text1">My Orders</span> 
                        </div>
                    </div>}
                </div>
                <div onClick={()=>navigate("/viewcart/")} className="cart22">
                    <div className="aCart">
                        <ShoppingCartOutlinedIcon/>
                    </div>
                    <div className="words">
                        <div className="count">{count}</div>
                        <div className="cartWord">Cart</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
