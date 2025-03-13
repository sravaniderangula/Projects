
import { useState, useEffect } from "react";
import { getProductDetails, getCartItems, getWishlistItems, addCartItem, addWishlistItem, removeProductFromCart, removeProductFromWishlist } from "../services/authService";
import { useParams, useNavigate } from 'react-router-dom';
import StarIcon from '../assets/star.svg';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
export default function ProductDetails() {
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const { id } = useParams();
  const product_id = parseInt(id);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const user_id = user.id;
  console.log("user id", user_id);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductDetails(product_id);
        setReviews(data.reviews);
        setProduct(data.product);
        // console.log("productDetails", data.product);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [product_id]);
  useEffect(() => {
    if (product) {
      const { title, description, price, rating, images } = product;
      setImages(images);
      setTitle(title);
      setDescription(description);
      setPrice(price);
    }
  }, [product]);

  useEffect(() => {
    async function fetchCartData() {
      try {
        const data = await getCartItems();
        setCartData(data);
        console.log("Cart Items", data);
        // console.log("cart length", cartData.length);
      } catch (error) {
        console.log("Error :", error.message)
      }
    }
    fetchCartData();
  }, [user_id]);

  useEffect(() => {
    async function fetchWishlistData() {
      try {
        const data = await getWishlistItems();
        setWishlistData(data);
        console.log("Wishlist Items", data);
      } catch (error) {
        console.log("Error :", error.message)
      }
    }
    fetchWishlistData();

  }, [user_id])


  function addToWishlist() {
    async function addToWishlistHandler() {
      try {
        const response = await addWishlistItem({ user_id, product_id });
        setInWishlist(true);
        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (user_id && product_id) {
      addToWishlistHandler();
    }

  }
  function removeFromWishlist() {

    async function removeWishlistHandler() {
      try {
        const response = await removeProductFromWishlist({ user_id, product_id });
        setInWishlist(false);
        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (user_id && product_id) {
      removeWishlistHandler();
    }

  }
  function addToCart() {
    async function addToCartHandler() {
      try {
        const quantity = 1;
        const response = await addCartItem({ user_id, product_id, quantity });
        setInCart(true);
        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (user_id && product_id) {
      addToCartHandler();
    }
  }
  function removeFromCart() {
    async function removeCartHandler() {
      try {
        const response = await removeProductFromCart({ user_id, product_id });
        setInCart(false);
        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (user_id && product_id) {
      removeCartHandler();
    }

  }

  useEffect(()=>{
    setInCart(cartData.some((item)=>item.product_id===product_id))

  },[product_id,cartData]);

  useEffect(()=>{
    setInWishlist(wishlistData.some((item)=>item.product_id===product_id))
  },[product_id,cartData]);


  


  



  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 border rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-black text-white border rounded-md 

          transition-transform duration-150 active:scale-90 active:bg-slate-900

      ">Back</button>
      {/* Product Card Container */}
      <div className="bg-white shadow-lg border rounded-lg space-y-5">
        {/* images container */}
        <div key="image" className="w-full p-4" >
          <div className=" flex gap-4 overflow-x-auto scrollbar-hide">
            {
              (images.length > 0) ?
                (images.map((image, index) => (
                  <img key={index} className="w-40 h-40 object-contain sm-w-48 sm-h-48 hover:scale-105 transition-transform" src={image} alt={`image ${index + 1}`} />
                ))
                ) :
                (<h1>No images available</h1>)
            }
          </div>

        </div>
        {/* Product Details  */}
        <div key="product_details" className="w-full p-4 ">
          <h1 key="title" className="text-slate-900 font-semibold text-lg">{title}</h1>
          <p key="description" className="mt-2 text-gray-600 font-normal text-md ">{description}</p>
          <p key="price" className='mt-2 text-yellow-500 font-bold'>{
            new Intl.NumberFormat("en-In", {
              style: "currency",
              currency: "INR"
            }).format(price)
          }</p>
        </div>

        {/* Buttons */}

        <div key="buttons" className="w-full p-4 flex items-center justify-around gap-2">

          {(inCart) ? (<button key="Ac" onClick={removeFromCart} className="px-4 py-2 bg-black text-white border
           rounded-md  transition-transform duration-150 active:scale-90 active:bg-slate-900">Remove From Cart</button>
          ) : (<button key="RC" onClick={addToCart} className="px-4 py-2 bg-black text-white border rounded-md
             transition-transform duration-150 active:scale-90 active:bg-slate-900">Add To Cart</button>
          )}

          {(inWishlist) ? (<button key="AW" onClick={removeFromWishlist} className="px-4 py-2 bg-black text-white border 
          rounded-md transition-transform duration-150 active:scale-90 active:bg-slate-900">Remove From Wishlist</button>
          ) : (<button key="Rw" onClick={addToWishlist} className="px-4 py-2 bg-black text-white border rounded-md 
            transition-transform duration-150 active:scale-90 active:bg-slate-900">Add To Wishlist</button>
          )}

        </div>


        {/* Reviews */}
        <div key="reviews" className="w-full p-4 flex  flex-col gap-4">
          {(reviews.length > 0) ?
            (
              reviews.map((review, index) => (
                <div className="p-2 border rounded-md shadow-lg" key={index}>
                  <h1 className="">{review.name}</h1>
                  <p className="mt-2">{
                    <img src={StarIcon} alt='Star' className='w-5 h-5' />
                  }</p>
                  {review.rating}
                  <h2 className="mt-2">{review.comment}</h2>
                </div>
              ))
            ) :
            (<h1>No Reviews available</h1>)
          }
        </div>

      </div>

    </div>
  )

}


