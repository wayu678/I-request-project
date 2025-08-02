import { Button, Card, Flex, Image, Input, Row } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<"admin" | "user">("user");
    const [language, setLanguage] = useState<"th" | "en">("th");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = () => {
        try {
            const val = username.trim();
            const pass = password.trim();
            if (val.length !== username.length) {
                throw new Error("space is not allowed");
            }

            if (pass.length !== password.length) {
                throw new Error("space is not allowed, Password must be 6 characters");
            }

            if (val.length > 0 && pass.length > 0) {
                navigate("/irst04");
            } else {
                throw new Error("username and password are required");
            }
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    const switchLoginType = () => {
        setLoginType(loginType === "admin" ? "user" : "admin");
    }

    const switchLanguage = () => {
        setLanguage(language === "th" ? "en" : "th");
    }

    const onKuAllLogin = () => {
        console.log("kuAllLogin");
    }

    const onForgotPassword = () => {
        console.log("forgotPassword");
    }

    return (
        <>

        </>
    )
}

export default Login