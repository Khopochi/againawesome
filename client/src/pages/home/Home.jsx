import React, { useContext, useEffect, useState } from 'react';
import './home.scss'
import { Navbar } from '../../components/navbar/Navbar';
import { LowerNav } from '../../components/lowernav/LowerNav';
import { Headerslider } from '../../components/headerslider/Headerslider';
import { Trending } from '../../parts/trending/Trending';
import { TrendingProduct } from '../../components/trendingproduct/TrendingProduct';
import { HotCategory } from '../../parts/hotcategories/HotCategory';
import { SingleHotCat } from '../../components/hotcatgory/SingleHotCat';
import { Card } from '../../components/card/Card';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const Home = () => {

  const {user} = useContext(AuthContext)
  const [products,setProducts] = useState()
  const fetchData = async () => {
    try{
      const product = await axios.get(process.env.REACT_APP_API_URL+"product/getproducts")
      setProducts(product.data)
    }catch(err){

    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  console.log(user)
  return (
    <div className="home">
      <div className="unmovable">
      <Navbar/>
      </div>
        <LowerNav/>
        <Headerslider/>
        <Trending/>
        <div className="trendingDiv">
          {
            products?.map((pr,i)=>(
              <TrendingProduct key={i} data={pr}/>
            ))
          }
        </div>
        <HotCategory/>
        <div className="hotCategoryDiv">
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
          <SingleHotCat/>
        </div>
        <div className="cardsarea">
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div>
          gdhywfdyuwfgdyuywfyud
        </div>
    </div>
  )
}
