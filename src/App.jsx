import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import useAuthCheck from "./hooks/userAuthCheck";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const authChecked = useAuthCheck(); // Call the auth check hook

    if (!authChecked) {
        // Show loading spinner until the authentication check is complete
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    // Render the app after the auth check is done
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/inbox" element={<Conversation />} />
                <Route path="/inbox/:id" element={<Inbox />} />
            </Routes>
        </Router>
    );
}

export default App;
