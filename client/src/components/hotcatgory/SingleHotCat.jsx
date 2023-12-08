import React from 'react';
import './singlehotcat.scss'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SingleHotCat = () => {
  return (
    <div className="singlehotcat">
        <div className="imageDiv">
            <img src="https://amazcart.ischooll.com/public/uploads/images/09-01-2023/63bbb78814171.jpeg" alt="" className="catimg" />
        </div>
        <div className="detailsDiv">
            <div className="upper">
                <div className="namediv">
                    Women hand Bags
                </div>
                <div className="quantitydiv">
                    20 in stock
                </div>
            </div>
            <div className="lower">
                <div className='shopmore'>SHOP MORE</div> <div className='icon'><FontAwesomeIcon icon={faAnglesRight} /> </div>
            </div>
        </div>
    </div>
  )
}
