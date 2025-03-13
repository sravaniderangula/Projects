
const API_URL='http://localhost:3600';

export async function signup(userDetails){

    try{
        const response=await fetch(`${API_URL}/auth/SignUp`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(userDetails)
        });
        return response;

    }catch(error){
        console.log("Error in ",error.message)
    }

    
}

export async function login(userDetails){

    try{
        const response=await fetch(`${API_URL}/auth/Login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(userDetails)
        });
        return response;
    }catch(error){
        console.log("Error in ",error.message)
    }
    

}

export async function getProducts() {

    try{
            // console.log("Products api was called");
    const response = await fetch(`${API_URL}/product/get/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data= response.json();
    // console.log("Fetched Data:", data);
    // console.log("Type of data.products:", typeof data.products);
    // console.log("Is data.products an array?", Array.isArray(data.products));
    
    
    return data;

    }catch(error){
        console.log("Error in ",error.message)
    }

}

export async function getCategories() {
    try{
            // console.log("Categories api was called");
    const response = await fetch(`${API_URL}/product/get/categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data= await response.json();
    // console.log(Array.isArray(data.products))
    return data;

    }catch(error){
        console.log("Error in ",error.message)
    }

}

export async function getProductDetails(id) {

    try{

        const response =await fetch(`${API_URL}/product/get/product/${parseInt(id)}`,{
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if(!response.ok){
            return "Something went wrong";
        }
        const data= await response.json();
        // console.log("Fetched data",data)
        return data;

    }catch(error){
        return error;
    }
    
}


export async function getCartItems() {
    try{
        const response = await fetch(`${API_URL}/cart/get/items`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data=await response.json();
        
        
        return data.Cart;

    }catch(error){
        console.log("Error in ",error.message)
    }
    
}


export async function getWishlistItems() {
    try{
        const response = await fetch(`${API_URL}/wishlist/get/items`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data=await response.json();
        
        
        return data.wishlist;

    }catch(error){
        console.log("Error in ",error.message)
    }

}

export async function addCartItem({user_id,product_id,quantity}){
    try{
        console.log(user_id,parseInt(product_id),quantity)
    const response=await fetch(`${API_URL}/cart/add/item`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            user_id:user_id,
            product_id:product_id,
            quantity:quantity
        })
    });
    if(!response.ok){
        return "Something went wrong"
    }
    const data=await response.json();
    return data.message;

    }catch(error){
        console.log("Error in ",error.message)
    }

    
    

}

export async function addWishlistItem({user_id,product_id}){
    try{
        console.log("Add to wishlist was called");

    console.log(user_id,product_id);

    const response=await fetch(`${API_URL}/wishlist/add/item`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            user_id:user_id,
            product_id:product_id
        })
    });

    if(!response.ok){
        return "Something went wrong"
    }
    const data=await response.json();
    return data.message;

    }catch(error){
        console.log("Error in ",error.message)
    }

    
}

export async function removeProductFromCart({user_id,product_id}){

    console.log("user id and product id in remove cart",user_id,product_id)

    try{
        const response =await fetch(`${API_URL}/cart/delete/item`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                user_id:user_id,
                product_id:product_id
            })
        })
        if(!response.ok){
            return "Something went wrong"
        }
        const data=await response.json();
        return data.message;

    }catch(error){
        console.log("Error in ",error.message)
    }

    

}

export async function removeProductFromWishlist({user_id,product_id}){

    console.log("user id and product id in remove wishlist",user_id,product_id)

    try{
        console.log("Remove from wishlist was called");


    const response =await fetch(`${API_URL}/wishlist/delete/item`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            user_id:user_id,
            product_id:product_id
        })
    })
    if(!response.ok){
        return "Something went wrong"
    }
    const data=await response.json();
    return data.message;

    }catch(error){
        console.log("Error in ",error.message)
    }

    

}

