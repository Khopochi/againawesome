import React from 'react';
import './cardproduct.scss'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';

export const CardProduct = () => {
  return (
    <div className="cardproduct">
        <div className="instock">20 in Stock</div>
        <div className="productimage">
            <div className="imageWrapper">
                <img className='rawImage' src="https://amazcart.ischooll.com/public/uploads/images/15-12-2022/639ae68c5fb25.jpeg" alt="" />
            </div>
        </div>
        <div className="productDetails">
            <div className="upper">
                <div className="title">Home appliances</div>
                <div className="productname">Sony Sream Iron, Cordless...</div>
            </div>
            <div className="lower">
                <div className="addtocart">
                    <AddShoppingCartSharpIcon/>
                </div>
                <div className="price">
                    <span>MWK</span>45,000
                </div>
            </div>      
        </div>
    </div>
  )
}
