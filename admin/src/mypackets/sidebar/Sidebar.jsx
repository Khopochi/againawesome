import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import './sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='sidebar'>
      <div className="jiabaili">
        <div className="upper">
          <div className="img">
              <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="middle">
          <span className="name">JiaBaiLi Supermarket</span>
          <span className="email">info@jiabaili.com</span>
        </div>
        <div className="lower">
          Visit website
        </div>
      </div>
      <div className="item">
        <div className="icon"><HomeOutlinedIcon/></div>
        <div className="term">
          <div className="master">Home</div>
        </div>
      </div>
      <div className="item">
        <div className="icon"><DescriptionOutlinedIcon/></div>
        <div className="term">
          <div onClick={()=>navigate("/orders/")} className="master">Orders</div>
        </div>
      </div>

      <div className="item">
        <div className="icon"><LocalOfferOutlinedIcon/></div>
        <div className="term">
          <div onClick={()=>navigate("/addproduct/")} className="master">Products</div>
        </div>
      </div>

      <div className="item">
        <div className="icon"><PointOfSaleOutlinedIcon/></div>
        <div className="term">
          <div className="master">Payments</div>
        </div>
      </div>

    </div>
  )
}
