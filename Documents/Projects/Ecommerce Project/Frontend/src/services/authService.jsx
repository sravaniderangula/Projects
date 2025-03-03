
const API_URL='http://localhost:3600';

export async function signup(userDetails){
    const response=await fetch(`${API_URL}/SignUp`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userDetails)
    });
    return response.json();
}

export async function login(userDetails){
    const response=await fetch(`${API_URL}/Login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userDetails)
    });
    return response.json();

}