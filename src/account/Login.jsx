import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const email = params.get("email");
        const userId = params.get("id");
        const loginDate = params.get("date"); // Datum uit URL

        if (token && email && loginDate && email && userId) {
            // Opslaan in localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("loginDate", loginDate);
            localStorage.setItem("userId", userId);

            // Redirect naar de homepagina zonder token in de URL
            navigate("/", { replace: true });
        } else {
            console.warn("Ongeldige logingegevens, redirect naar externe site...");
            window.location.href = "https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://145.24.223.48/login/";
        }
    }, [location, navigate]);

    return <p>Bezig met inloggen...</p>;
};

export default Login;
