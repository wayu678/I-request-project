import { Button, Card, Flex, Image, Input, Row } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { Language } from "../../constants/common";

const Login = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<"admin" | "user">("user");
    const { language, setLanguage, translate } = useTranslate();

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

    const onKuAllLogin = () => {
        console.log('onKuAllLogin');
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
                                    type={language === Language.TH ? "link" : "text"}
                                    onClick={() => setLanguage(Language.TH)}
                                >
                                    <span className="text-sm">
                                        {Language.TH}
                                    </span>
                                </Button>
                                /
                                <Button
                                    type={language === Language.EN ? "link" : "text"}
                                    onClick={() => setLanguage(Language.EN)}
                                >
                                    <span className="text-sm">
                                        {Language.EN}
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
                            <span className="text-lg font-bold text-[#006C68]">{translate("เข้าใช้งานระบบยื่นคำร้อง", "System for Tracking Requests")}</span>
                        </Row>
                        {
                            loginType === "admin" && (
                                <Row className="w-full fade-in" justify="center" align="middle">
                                    <Flex vertical gap={20} className="w-full">
                                        <Flex vertical className="w-full">
                                            <label className="w-full text-md">
                                                {translate("ชื่อผู้ใช้งาน", "Username")}
                                            </label>
                                            <Input
                                                size="large"
                                                placeholder={translate("ชื่อผู้ใช้งาน", "Username")}
                                                value={username}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </Flex>
                                        <Flex vertical className="w-full">
                                            <label className="w-full text-md">
                                                {translate("รหัสผ่าน", "Password")}
                                            </label>
                                            <Input
                                                size="large"
                                                placeholder={translate("รหัสผ่าน", "Password")}
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
                                                    {translate("ลืมรหัสผ่าน ?", "Forgot Password ?")}
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
                                            {translate("เข้าสู่ระบบ", "Login")}
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