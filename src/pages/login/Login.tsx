import { Button, Card, Flex, Image, Input, Row, message } from "antd"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { LANGUAGE, LOGIN_TYPE } from "../../constants/common";
import { useForm } from "react-hook-form";
import { IreTextbox } from "../../components/utils";
import { useAuth } from "../../contexts/AuthContext";

interface SignInForm {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginType, setLoginType] = useState<typeof LOGIN_TYPE[keyof typeof LOGIN_TYPE]>(LOGIN_TYPE.USER);
    const { language, setLanguage, translate } = useTranslate();
    const { login, isLoading } = useAuth();

    const signInForm = useForm<SignInForm>();

    // Get return URL from location state
    const from = location.state?.from?.pathname || '/dashboard';

    const onLogin = async () => {
        try {
            const username = signInForm.getValues("username")?.trim();
            const password = signInForm.getValues("password")?.trim();

            const isValid = await signInForm.trigger();
            if (isValid && username && password) {
                const success = await login(username, password);
                if (success) {
                    message.success('เข้าสู่ระบบสำเร็จ');
                    navigate(from, { replace: true });
                } else {
                    message.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
                }
            } else {
                message.warning('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
            }
        } catch (error: any) {
            console.error(error);
            message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
    }

    const switchLoginType = () => {
        setLoginType(loginType === LOGIN_TYPE.ADMIN ? LOGIN_TYPE.USER : LOGIN_TYPE.ADMIN);
    }

    const onKuAllLogin = async () => {
        try {
            // Mock KU All-Login
            const success = await login("ku_user", "ku_password");
            if (success) {
                message.success('เข้าสู่ระบบ KU All-Login สำเร็จ');
                navigate(from, { replace: true });
            } else {
                message.error('ไม่สามารถเข้าสู่ระบบ KU All-Login ได้');
            }
        } catch (error) {
            console.error('KU All-Login failed:', error);
            message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ KU All-Login');
        }
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
                                    {loginType === LOGIN_TYPE.ADMIN ? "Login as Student" : "Login as Administrator"}
                                </Button>
                                <Button
                                    type={language === LANGUAGE.TH ? "link" : "text"}
                                    onClick={() => setLanguage(LANGUAGE.TH)}
                                >
                                    <span className="text-sm">
                                        {LANGUAGE.TH}
                                    </span>
                                </Button>
                                /
                                <Button
                                    type={language === LANGUAGE.EN ? "link" : "text"}
                                    onClick={() => setLanguage(LANGUAGE.EN)}
                                >
                                    <span className="text-sm">
                                        {LANGUAGE.EN}
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
                            loginType === LOGIN_TYPE.ADMIN && (
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
                            loginType === LOGIN_TYPE.ADMIN && (
                                <>
                                    <Button
                                        className="w-full"
                                        color="green"
                                        variant="outlined"
                                        size="large"
                                        block
                                        loading={isLoading}
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
                                loading={isLoading}
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