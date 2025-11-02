import { Button, Card, Flex, Image, Row, message } from "antd"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { LANGUAGE, LOGIN_TYPE } from "../../constants/common";
import { useForm } from "react-hook-form";
import { IreTextbox } from "../../components/utils";
import { authenticationService } from "../../services/api/auth";



interface SignInForm {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginType, setLoginType] = useState<typeof LOGIN_TYPE[keyof typeof LOGIN_TYPE]>(LOGIN_TYPE.ADMIN);
    const [loading, setLoading] = useState(false);
    const { language, setLanguage, translate } = useTranslate();


    const signInForm = useForm<SignInForm>();

    // Get return URL from location state
    const from = location.state?.from?.pathname || '/dashboard';

    const onLogin = async () => {
        try {
            const username = signInForm.getValues("username")?.trim();
            const password = signInForm.getValues("password")?.trim();

            const isValid = await signInForm.trigger();
            if (!isValid) {
                message.error(translate("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน", "Please enter username and password"));
                return;
            }

            if (!username || !password) {
                message.error(translate("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน", "Please enter username and password"));
                return;
            }

            setLoading(true);

            const loginResponse = await authenticationService.login({
                username,
                password
            });

            if (loginResponse.success) {
                message.success(translate("เข้าสู่ระบบสำเร็จ", "Login successful"));

  
                navigate(from, { replace: true });
            } else {
                message.error(loginResponse.message || translate("เข้าสู่ระบบไม่สำเร็จ", "Login failed"));
            }

        } catch (error: any) {
            console.error("Login error:", error);
            message.error(translate("เข้าสู่ระบบไม่สำเร็จ", "Login failed"));
        } finally {
            setLoading(false);
        }
    }

    const switchLoginType = () => {
        setLoginType(loginType === LOGIN_TYPE.ADMIN ? LOGIN_TYPE.USER : LOGIN_TYPE.ADMIN);
    }

    const onKuAllLogin = async () => {
        try {
            setLoading(true);
            // Mock KU All-Login
            const loginResponse = await authenticationService.login({
                username: "ku_user",
                password: "ku_password"
            });

            if (loginResponse.success) {
                message.success('เข้าสู่ระบบ KU All-Login สำเร็จ');
                navigate(from, { replace: true });
            } else {
                message.error('ไม่สามารถเข้าสู่ระบบ KU All-Login ได้');
            }
        } catch (error) {
            console.error('KU All-Login failed:', error);
            message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ KU All-Login');
        } finally {
            setLoading(false);
        }
    }

    const onForgotPassword = () => {
        console.log("forgotPassword");
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen login-bg">
                <Card className="w-full max-w-[450px] h-full max-h-fit min-h-[640px] shadow-lg">
                    <Flex className="w-full h-full" vertical gap={15}>
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
                                    style={{ color: language === LANGUAGE.TH ? '#339966' : '#000000' }}
                                >
                                    <span className="text-sm">
                                        {LANGUAGE.TH}
                                    </span>
                                </Button>
                                /
                                <Button
                                    type={language === LANGUAGE.EN ? "link" : "text"}
                                    onClick={() => setLanguage(LANGUAGE.EN)}
                                    style={{ color: language === LANGUAGE.EN ? '#339966' : '#000000' }}
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
                                <Flex vertical>
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
                                </Flex>
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
                                        loading={loading}
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
                                loading={loading}
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