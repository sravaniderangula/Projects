
import { useState, useEffect } from "react";
import { getProductDetails, getCartItems, removeProductFromCart } from "../services/authService";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
export default function CartPage() {

    const { user } = useContext(AuthContext);
    const user_id = user.id;
    console.log("user id", user_id);
    const [cartData, setCartData] = useState([]);

    const [products, setProducts] = useState([]);

    const [removeId,setRemoveId]=useState(0);

    useEffect(() => {
        async function fetchCartData() {
            try {
                const data = await getCartItems();
                setCartData(data);
                console.log("Cart Items", data);
            } catch (error) {
                console.log("Error :", error.message)
            }
        }
        if(user_id){
            fetchCartData();

        }
    }, [user_id]);


    async function fetchProductData(product_id) {
        try {
            const data = await getProductDetails(product_id);
            console.log("productDetails", data);
            return data.product;
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {

        if (cartData.length === 0) {
            return
        }

        async function fetchProducts() {
            let cartProducts = await Promise.all(cartData.map((item) => fetchProductData(item.product_id)))

            setProducts(cartProducts);
        }

        fetchProducts();



    }, [cartData]);



    useEffect(()=>{

        if(removeId===0){
            return
        }

        async function removeCartHandler() {
            try {
                console.log("user id and product id in remove cart handler",user_id,removeId)
                const product_id=removeId;
                const response = await removeProductFromCart({ user_id, product_id });
                setCartData(cartData.filter((item)=>item.product_id!==removeId))
                console.log("Response:", response);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        if (user_id && removeId) {
            removeCartHandler();
        }


    },[removeId]);

    


    return (
        <div className="max-w-xl  p-4 ">

            {/* Product Card Container */}

            <div className="flex gap-4 bg-white shadow-lg border rounded-lg ">
                {products.map(({ id, title, description, price, images }) => (
                    < div key={`${user_id} ${id}`} className="w-full p-4 " >
                        <img className="w-40 h-40 object-contain sm-w-48 sm-h-48 hover:scale-105 transition-transform" src={images[0]} alt='image' />

                        <h1 className="text-slate-900 font-semibold text-lg">{title}</h1>
                        <p className="mt-2 text-gray-600 font-normal text-md ">{description}</p>
                        <p className='mt-2 text-yellow-500 font-bold'>{
                            new Intl.NumberFormat("en-In", {
                                style: "currency",
                                currency: "INR"
                            }).format(price)
                        }</p>

                        <div key="buttons" className="w-full p-4 flex items-center justify-center gap-2 mt-3">

                            <button key="Ac" onClick={() => { setRemoveId(parseInt(id)) }} className="px-4 py-2 bg-black text-white border
rounded-md  transition-transform duration-150 active:scale-90 active:bg-slate-900">Remove From Cart</button>
                        </div>
                    </div>





                ))}
            </div>







        </div >
    )
}


