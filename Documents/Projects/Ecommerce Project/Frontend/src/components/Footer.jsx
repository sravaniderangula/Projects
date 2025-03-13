
export default function Navbar() {

    return (
        <footer className="bottom-0  bg-black text-lg font-bold text-white w-full p-6">
            <div className="w-full  flex flex-col items-center justify-center space-y-2">
                <p >ShopNest</p>
                <div className="flex items-center justify-center space-x-4">
                    <a href="#" className="hover:underline hover:text-gray-500">About Us</a>
                    <a href="#" className="hover:underline">Contact Us</a>
                    <a href="#" className="hover:underline">Services</a>
                </div>
                <p>@ All Rights reserved</p>
            </div>
        </footer>
    )
}