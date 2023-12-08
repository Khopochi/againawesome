import React, { useState } from 'react';
import './login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseurl from '../../ourapi';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    //navigate user to home
    const  navigate = useNavigate()
    //habdkle digits only
    const [value, setValue] = useState('');
    const handleInputChange = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ''));
    };

    const [credetials, setCredetials] = useState({
        username: undefined,
        password: undefined
    })
    const handleChange = (e) => {
        setCredetials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    const loguser = async () => {
        try{
            const  res = await axios.post(baseurl+"admin/login",credetials)
            navigate("/addproduct/")
        }catch(err){

        }
    }

    
  return (
    <div className="loginPage">
        <div className="title">
            Admin
        </div>
        <div className="registerArea">
            <div className="title">
                Sign In
            </div>
            <div className="fname phone">
                <div className="name">Username</div>
                <div className="inputarea">
                    <input type="text" id='username' onChange={handleChange} className="phoneinput" />
                </div>
                
            </div>
            <div className="fname">
                <div className="name">Password</div>
                <input id='password' onChange={handleChange} type="text" className="fnmae" />
                <div className='passadvice'>
                    <span><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    Forgot password?
                    </div>
            </div>
            <div className="fname">
                <button onClick={()=>loguser()}>Continue</button>
            </div>


            <div className="fname">
                <div className="divider"></div>
            </div>
        </div>
        <div className="conclusion">
            @JiaBaiLi.shop, 2018-2023
        </div>
    </div>
  )
}
