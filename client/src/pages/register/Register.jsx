import React, { useState } from 'react';
import './register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const Register = () => {
    //habdkle digits only
    const [value, setValue] = useState('');
    const handleInputChange = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ''));
      };
  return (
    <div className="registerPage">
        <div className="title">
            Jiabaili Supeermaket
        </div>
        <div className="registerArea">
            <div className="title">
                Create Account
            </div>
            <div className="fname">
                <div className="name">Firstname</div>
                <input type="text" placeholder='Firstname' className="fnmae" />
            </div>
            <div className="fname">
                <div className="name">Last name</div>
                <input type="text" placeholder='Last name' className="fnmae" />
            </div>
            <div className="fname phone">
                <div className="name">Phone Number</div>
                <div className="inputarea">
                    <span>+265</span>
                    <input type="text" maxLength={9} value={value} onChange={handleInputChange}  className="phoneinput" />
                </div>
                
            </div>
            <div className="fname">
                <div className="name">Password</div>
                <input type="text" className="fnmae" />
                <div className='passadvice'>
                    <span><FontAwesomeIcon icon={faInfoCircle} /></span>
                    Passwords must be at least 6 characters
                    </div>
            </div>
            <div className="fname">
                <div className="name">Re-enter password</div>
                <input type="text"  className="fnmae" />
            </div>

            <div className="fname">
                <button>Continue</button>
            </div>

            <div className="fname">
                <div className="termsandconditions">
                By creating an account, you agree to <span className='link'>JiaBaiLi's Supermarket Conditions of Use</span> and <span className='link'>Privacy Notice</span>.
                </div>
            </div>

            <div className="fname">
                <div className="divider"></div>
            </div>

            <div className="fname">
                <div className="termsandconditions1">
                    Already have an Account? <span className='link'>Sign in</span>
                </div>
            </div>
        </div>
        <div className="conclusion">
            @JiaBaiLi.shop, 2018-2023
        </div>
    </div>
  )
}
