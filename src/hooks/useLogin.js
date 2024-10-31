import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			// console.log(`login env --- ${import.meta.env.VITE_API_BASE_URL}`)
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: 'include', 
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			localStorage.setItem('token', data.token);
			if (data.error) {
				throw new Error(data.error);
			}
            console.log(data);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			toast.success('logged in successfully')
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}