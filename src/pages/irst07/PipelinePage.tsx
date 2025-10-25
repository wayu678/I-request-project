import { Card, Row, Col, Steps } from "antd"
import { useTranslate } from "../../provider/hooks/translate.hook"
import { useNavigate } from "react-router-dom"

interface PipelinePageProps {
    currentStep?: number
}

const PipelinePage = ({ currentStep = 0 }: PipelinePageProps) => {
    const { translate } = useTranslate()
    const navigate = useNavigate()

    // กำหนดหน้าเชื่อมต่อของแต่ละ Step
    const stepRoutes = [
        "/irst07",  // Step 0
        "/irst07/detail",    // Step 1
        "/send-request",    // Step 2
    ]

    const steps = [
        { title: translate("สร้างคำร้อง", "Create Request") },
        { title: translate("แก้ไขข้อมูลคำร้อง", "Edit Request Information") },
        { title: translate("ส่งคำร้อง", "Send Request") },
    ]

    return (
        <div className="bg-white rounded-lg">
            <div className="p-5">
                <Row>
                    <Col span={24}>
                        <Steps
                            current={currentStep}
                            direction="horizontal"
                            labelPlacement="horizontal"
                            size="small"
                            items={steps.map((step, index) => ({
                                title: step.title,
                                className: "text-sm cursor-pointer", // เพิ่ม cursor pointer
                                onClick: () => navigate(stepRoutes[index]), // คลิกแล้วไปหน้า
                            }))}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default PipelinePage
