
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Products() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        JSON.parse(localStorage.getItem("category")) || "all"
    );
        const navigate=useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            let data = []
            data = await getProducts();
            // console.log("Fetched Products", data);
            // console.log(Array.isArray(data.products))
            setProducts(data.products);
            // console.log("after set products", products);
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        async function fetchCategories() {
            let data = []
            data = await getCategories();
            // console.log("Fetched Categories", data);
            // console.log(Array.isArray(data.categories))
            setCategories(data.categories);
        }
        fetchCategories();
    }, []);

    const filteredProducts = selectedCategory === "all" ? products : (products.filter((product) => product.category_id === parseInt(selectedCategory)));

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id == categoryId);
        return category ? category.category_name : "Unknown";
    }


    return (

        <div className='mx-auto max-w-7xl p-4 '>

            <div >
                <select className="p-2 border-gray-300 rounded-md w-full sm:w-64 " value={selectedCategory}
        onChange={(e) => {
            setSelectedCategory(e.target.value);
            localStorage.setItem("category", JSON.stringify(e.target.value));
        }}
                    >
                    <option key="all" value="all">All</option>
                    {categories.map((category, index) => {
                        return (
                            <option key={category.id} value={category.id}>{category.category_name}</option>
                        )
                    })}

                </select>

            </div>

            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {filteredProducts.map(({ id, title, description, images, price, category_id }) => {
                    return (

                        <div key={id} className='bg-white rounded-md p-4 shadow-md hover:shadow-xl transition duration-300 w-full'>
                            <img className='w-full h-48 object-contain rounded-md' src={images[0]} alt={title} />
                            <h2 className='text-slate-900 font-semibold mt-2'>{title}</h2>
                            <p className=' mt-2 text-slate-900 font-medium line-clamp-2'>{description}</p>
                            <p className='mt-2 text-yellow-500 font-bold'>{
                                new Intl.NumberFormat("en-In", {
                                    style: "currency",
                                    currency: "INR"
                                }).format(price)
                            }</p>
                            <button className='mt-2 py-2 px-2 bg-slate-900 text-white font-medium rounded-md shadow-md 
                            transition-transform duration-150 active:scale-90 active:bg-slate-500 hover:bg-slate-700 '
                              onClick={() => navigate(`/product/${id}`)}>View Details</button>

                        </div>

                    )
                })}
            </div>

        </div>
    )


}
