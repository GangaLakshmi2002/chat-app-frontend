
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        console.log("inside singup")
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
        console.log(success, "success")
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include', 
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            });
            console.log("res", res);
            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success('user registered successfully')
        } catch (error) {
           toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    };
    return {loading, signup};
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");

		return false;
	}

	if (password.length < 3) {

		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
