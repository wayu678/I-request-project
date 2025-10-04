import Label from "../../components/utils/Label"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "antd"

const Demo = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    หน้า Demo
                </h1>
                <p className="text-center mb-6 text-gray-600">
                    ยินดีต้อนรับสู่ระบบยื่นคำร้อง
                </p>
                <Button
                    type="primary"
                    size="large"
                    className="w-full"
                    style={{
                        backgroundColor: "#006C68",
                        borderColor: "#006C68"
                    }}
                    onClick={() => navigate("/login")}
                >
                    ไปยังหน้า Login
                </Button>
            </div>
        </div>
    )
}

export default Demo