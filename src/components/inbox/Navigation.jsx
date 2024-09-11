import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
export default function Navigation() {
    const dispatch = useDispatch()
    const handleLogout =()=> 
    {
         dispatch(userLoggedOut())
         localStorage.clear()
    }
    return (
        <nav className="bg-violet-700 border-b border-general sticky top-0 z-40 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img className="h-10" src="/logo.svg" alt="Learn with Sumit" />
                    </Link>

                    {/* Logout Button */}
                    <button
                     onClick={handleLogout}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
