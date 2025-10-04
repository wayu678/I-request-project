import { Button, Card, Flex, Image, Input, Row } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { Language } from "../../constants/common";
import { useForm } from "react-hook-form";
import { IreTextbox } from "../../components/utils";

interface SignInForm {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<"admin" | "user">("user");
    const { language, setLanguage, translate } = useTranslate();

    const signInForm = useForm<SignInForm>();

    const onLogin = async () => {
        try {
            const username = signInForm.getValues("username")?.trim();
            const password = signInForm.getValues("password")?.trim();

            const isValid = await signInForm.trigger();
            if (isValid) {
                navigate("/");
            } else {
                console.warn("Username and password are required");
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
        navigate("/");
    }

    const onForgotPassword = () => {
        console.log("forgotPassword");
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen login-bg">
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
                                <>
                                    <Flex vertical className="fade-in">
                                        <IreTextbox
                                            label={translate("ชื่อผู้ใช้งาน", "Username")}
                                            formContext={signInForm}
                                            registerName={signInForm.register("username")}
                                            isRequired
                                        />
                                    </Flex>
                                    <Flex vertical className="fade-in">
                                        <IreTextbox
                                            label={translate("รหัสผ่าน", "Password")}
                                            formContext={signInForm}
                                            registerName={signInForm.register("password")}
                                            isRequired
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
                                </>
                            )
                        }
                        {
                            loginType === "admin" && (
                                <>
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
                                </>
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