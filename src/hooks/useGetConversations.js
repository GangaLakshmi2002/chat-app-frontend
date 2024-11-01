import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				// const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
				const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
					method: "GET",
					credentials: 'include', 
					headers: {Authorization: `Bearer ${localStorage.getItem('token')}` ,  "Content-Type": "application/json"}
				});
				const data = await res.json();
				console.log("users", data)
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;