import React, { useState } from 'react'
import './barcode.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const Barcode = () => {
    const navigate = useNavigate()
    const [barcode, setBarcode] = useState(undefined)
    const handleInputChange = (e) => {
        const value = e.target.value;
        setBarcode(value);
        setTimeout(() => {
            // Use navigate to navigate to a new route with the dynamic parameter
            navigate(`/addproduct/addpage/${value}`);
        }, 1000);
      };
  return (
    <div className='barcode'>
        <div className="container">
            <div className="upper">
                Scan Product
            </div>
            <div className="lower">
                <div className="icon">
                    <FontAwesomeIcon icon={faBarcode} />
                </div>
                {!barcode && <div className="code">
                <input
                    value={barcode || ''} // Set an empty string as the default value to avoid "controlled to uncontrolled" warning
                    placeholder="Not Scanned"
                    onChange={handleInputChange}
                    type="text"
                />
                </div>}
                {barcode && <div className="code">{barcode}</div>}
            </div>
            <div className="footer">
                Place the item in proximity to the barcode scanner for scanning
            </div>
        </div>
    </div>
  )
}
