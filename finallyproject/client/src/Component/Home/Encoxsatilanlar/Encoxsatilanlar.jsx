import React, { useEffect, useState } from 'react'
import './Encoxsatilanlar.css'
import axios from 'axios'
import { FaShoppingCart  , FaEye} from 'react-icons/fa';
import { AiFillHeart , AiFillStar} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Encoxsatilanlar() {
  const [data,setdata] = useState([])
  const [favdata
    ,setfavdata] = useState([])
  const [basketdata,setbasketdata] = useState([])
  const [loading,setloading] = useState(true)

  const [id,setid] = useState([])

  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  const getdata  = async()=>{
    const res = await axios.get("http://localhost:4000/API/products")
    
    const result = await axios.get("http://localhost:4000/API/favorite")
    result.data.filter(x=>x.userid === JSON.parse(localStorage.getItem('id')))
    .forEach(element => {
      res.data.forEach(elem => {
        if(element.productID == elem._id){
          axios.put(`http://localhost:4000/API/products/${elem._id}`,{colorforfav:"red"})
        }
      });
    });
    const resultbasket = await axios.get("http://localhost:4000/API/basket")
    resultbasket.data.filter(x=>x.userid === JSON.parse(localStorage.getItem('id')))
    .forEach(element => {
      res.data.forEach(elem => {
        if(element.productID == elem._id){
          axios.put(`http://localhost:4000/API/products/${elem._id}`,{colorforbasket:"green"})
        }
      });
    });

    setdata(res.data)
    setloading(true)
    setdata(res.data.filter(x=>x.moresell === "true"))
    setloading(false)
  }
  useEffect(()=>{
      getdata()
  },[])
  

  function fav(fill,ID,title,price,off,offprice,stars,about,img,category,kind,moresell,newproduct,keyforSearch,user,brend,color){
    const id = JSON.parse(localStorage.getItem('id'));
      if (id) {
        setid(id);
      }
    const items = JSON.parse(localStorage.getItem('account'));
    if (items) {
      setItems(items);
    }
    if(items === null || items === "false"){
      navigate("/Giris")
    }
    else if(items === "true"){
      const favorite = {
        userid:id,
        productID:ID,
        title:title,
        price:price,
        off:off,
        price_off:offprice,
        stars:stars,
        About:about,
        imageurl:img,
        category:category,
        kind:kind,
        moresell:moresell,
        new:newproduct,
        keyforSearch:keyforSearch,
        user:user,
        brend:brend,
        color:color
      }
      if(fill === "red"){
        axios.post(`http://localhost:4000/API/favorite`,favorite)  
        axios.put(`http://localhost:4000/API/products/${ID}`,{colorforfav:"red"})
      }
      else{
        axios.get(`http://localhost:4000/API/favorite`)  
        .then(res=>{
          res.data.forEach(element => {
            if(element.productID === ID){
              axios.delete(`http://localhost:4000/API/favorite/${element._id}`) 
              axios.put(`http://localhost:4000/API/products/${ID}`,{colorforfav:"white"}) 
            }
          });
        })
      }
      
    } 
  }
 
  function basket(fill,ID,title,price,off,offprice,stars,about,img,category,kind,moresell,newproduct,keyforSearch,user,brend,color){
    const id = JSON.parse(localStorage.getItem('id'));
      if (id) {
        setid(id);
      }
    const items = JSON.parse(localStorage.getItem('account'));
    if (items) {
      setItems(items);
    }
    if(items === null || items === "false"){
      navigate("/Giris")
    }
    else if(items === "true"){
      const basket = {
        userid:id,
        productID:ID,
        title:title,
        quantity:1,
        price:price,
        off:off,
        price_off:offprice,
        stars:stars,
        About:about,
        imageurl:img,
        category:category,
        kind:kind,
        moresell:moresell,
        new:newproduct,
        keyforSearch:keyforSearch,
        user:user,
        brend:brend,
        color:color
      }
      if(fill === "green"){
        axios.post(`http://localhost:4000/API/basket`,basket)  
        axios.put(`http://localhost:4000/API/products/${ID}`,{colorforbasket:"green"})
      }
      else{
        axios.get(`http://localhost:4000/API/basket`)  
        .then(res=>{
          res.data.forEach(element => {
            if(element.productID === ID){
              axios.delete(`http://localhost:4000/API/basket/${element._id}`) 
              axios.put(`http://localhost:4000/API/products/${ID}`,{colorforbasket:"black"}) 
            }
          });
        })
      }
  }
} 
const responsive = { 
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};
function detail(id){
  localStorage.setItem('detailsproductid',JSON.stringify(id))
  navigate(`/Details/${id}`)
}
  return (
    <div className="moresell">
        <p className="moresellhead">Ən çox satılanlar</p>

        <div className="moresellcontainer">
          
          {
            loading ? (
              <div className="moreselldefaultcontainer">
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
                <div className="moreselldefaultcart">
                </div>
            </div>
            ):
            (<Carousel className='coxsatilancarusel' responsive={responsive}>
              {data.map((item)=>(
                <div key={item._id} className="moresellcart">
                  <div className="moresellcartimage">
                    {
                      (item.price_off !== null) ? (
                        <div className="moreselloff">Endirim</div>
                      ):null
                    }
                    <img src={item.imageurl} alt="" className="moresellcartimg" />
                  </div>
                  <div className="moresellcarttext">
                    <p className="moresellcarttitletext">{item.title}</p>
                    <p className="moresellcartabouttext">{item.About}</p>
                      {
                        (item.price_off !== null)? (
                          <div className="moreselldivprice">
                            <del className="moresellcartprice" >{item?.price}</del>
                            <p className="moresellcartpriceoff">{item?.price_off}</p>
                            manat
                          </div>
                        ):(
                          <div className="moreselldivprice">
                            <p className="moresellcartprice" >{item?.price}</p>
                            manat
                          </div>
                        )
      
                      }
                  </div>
                  <div className="moresellcarticon">
                      <FaEye onClick={() => detail(item._id)} className="moresellcarticoneye" />
                      <AiFillHeart style={{fill:item.colorforfav}}  onClick={(e)=>{
                      if(e.target.style.fill == 'red'){
                        e.target.style.fill = 'white'
                      }
                      else{
                        e.target.style.fill = 'red'
                      };
                      fav(e.target.style.fill,item._id,item.title,item.price,item.off,item.price_off,item.stars,item.About,item.imageurl,item.category,item.kind,item.moresell,item.new,item.keyforSearch,item.user,item.brend,item.color)}} className='moresellcarticonheart'/>
                      <FaShoppingCart style={{fill:item.colorforbasket}} onClick={(e)=>{
                        if(e.target.style.fill == 'green'){
                          e.target.style.fill = 'black'
                        }
                        else{
                          e.target.style.fill = 'green'
                        };
                        basket(e.target.style.fill,item._id,item.title,item.price,item.off,item.price_off,item.stars,item.About,item.imageurl,item.category,item.kind,item.moresell,item.new,item.keyforSearch,item.user,item.brend,item.color)}} className='moresellcarticonbasket'/>
                  </div>
                </div>  
                ))}
            </Carousel>)
          }
        </div>
    </div>
  )
}
 
export default Encoxsatilanlar