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
            <div className="flex flex-col items-center justify-center h-screen"
                style={{
                    backgroundImage: `url(https://f.tpkcdn.com/images-720/b9bd86edddd99b27b95cf3896ff2517f.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Card className="w-full max-w-[450px] h-full max-h-[600px] shadow-lg">
                    <Flex className="w-full h-full" vertical gap={20}>
                        <Row className="w-full">
                            <Flex justify="right" align="center" className="w-full h-full">
                                <Button
                                    type="link"
                                    onClick={switchLoginType}
                                >
                                    {loginType === "admin" ? "Login as Student" : "Login as Administrator"}
                                </Button>
                                <Button
                                    type={language === "th" ? "link" : "text"}
                                    onClick={switchLanguage}
                                >
                                    <span className="text-sm">
                                        {`TH`}
                                    </span>
                                </Button>
                                /
                                <Button
                                    type={language === "en" ? "link" : "text"}
                                    onClick={switchLanguage}
                                >
                                    <span className="text-sm">
                                        {`EN`}
                                    </span>
                                </Button>
                            </Flex>
                        </Row>
                        <Row className="w-full mt-5" justify="center" align="middle">
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoLzPcypWSJBJPazKtgRKGWTfrjx6L5w-lbQ&s"
                                alt="logo"
                                width={100}
                                height={100}
                                preview={false}
                            />
                        </Row>
                        <Row className="w-full" justify="center" align="middle">
                            <span className="text-lg font-bold text-[#006C68]">{language === "th" ? "เข้าใช้งานระบบยื่นคำร้อง" : "System for Tracking Requests"}</span>
                        </Row>
                        {
                            loginType === "admin" && (
                                <Row className="w-full" justify="center" align="middle">
                                    <Flex vertical gap={20} className="w-full">
                                        <Flex vertical className="w-full">
                                            <label className="w-full text-md">
                                                {language === "th" ? "ชื่อผู้ใช้งาน" : "Username"}
                                            </label>
                                            <Input
                                                size="large"
                                                placeholder={language === "th" ? "ชื่อผู้ใช้งาน" : "Username"}
                                                value={username}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </Flex>
                                        <Flex vertical className="w-full">
                                            <label className="w-full text-md">
                                                {language === "th" ? "รหัสผ่าน" : "Password"}
                                            </label>
                                            <Input
                                                size="large"
                                                placeholder={language === "th" ? "รหัสผ่าน" : "Password"}
                                                value={password}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                            <Flex justify="end" align="center" className="w-full">
                                                <Button
                                                    type="link"
                                                    onClick={onForgotPassword}
                                                >
                                                    {language === "th" ? "ลืมรหัสผ่าน ?" : "Forgot Password ?"}
                                                </Button>
                                            </Flex>
                                        </Flex>
                                        <Button
                                            className="w-full"
                                            color="green"
                                            variant="outlined"
                                            size="large"
                                            block
                                            onClick={onLogin}
                                        >
                                            {language === "th" ? "เข้าสู่ระบบ" : "Login"}
                                        </Button>
                                        <Row justify="center" align="middle">
                                            <hr className="w-full border-[#006C68] max-w-[340px]" />
                                        </Row>
                                    </Flex>
                                </Row>
                            )
                        }
                        <Row>
                            <Button
                                className="w-full"
                                color="green"
                                variant="solid"
                                size="large"
                                block
                                onClick={onKuAllLogin}
                            >
                                KU All-Login
                            </Button>
                        </Row>
                    </Flex>
                </Card>
            </div >
        </>
    )
}

export default Login