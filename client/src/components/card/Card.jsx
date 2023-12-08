import React from 'react';
import './card.scss'
import { CardProduct } from '../cardproduct/CardProduct';

export const Card = () => {
    const coverimage = {
        backgroundImage: `url(https://amazcart.ischooll.com/public/uploads/images/21-02-2023/63f48b22a58d8.jpeg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '80vh',
        width: '50%'
    }
  return (
    <div className="card">
        <div className="left">
            <div className="detailsarea">
                <div className="title">
                        Bulding Material
                </div>
                <div className="subarea">
                    <div className="subcategory">Bathroom</div>
                    <div className="subcategory">Plumbing</div>
                    <div className="subcategory">Tiles</div>
                    <div className="subcategory">Water pipe</div>
                </div>
            </div>
            <div style={coverimage}>

            </div>
        </div>
        <div className="right">
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
        </div>
    </div>
  )
}
