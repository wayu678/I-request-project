import { useState } from "react"
import { Button, Card } from "antd"
import { useNavigate } from "react-router-dom"
import { useTranslate } from "../../provider/hooks/translate.hook"
import { Language } from "../../constants/common"
import { HomeOutlined, ArrowRightOutlined } from "@ant-design/icons"
import PipelinePage from "./PipelinePage"
import PostponeTuitionFormPage from "./PostponeTuitionFormPage"
import SubmitButton from "./SubmitButton"

const RequestForPostponeTuitionandFeePaymentsDetail = () => {
  const navigate = useNavigate()
  const { language, setLanguage, translate } = useTranslate()
  const [formData, setFormData] = useState({}) // เก็บข้อมูล form

  const onLanguageSwitch = (newLanguage: typeof Language[keyof typeof Language]) => {
    try {
      setLanguage(newLanguage)
    } catch (error: any) {
      console.error("Language switch error:", error)
    }
  }

  const breadcrumbItems = [
    { label: <HomeOutlined className="text-green-600" /> },
    { label: "/", className: "text-gray-400" },
    { label: translate("สร้างคำร้อง", "Create Request") },
    { label: "/", className: "text-gray-400" },
    {
      label: translate(
        "คําร้องขอผ่อนผันค่าธรรมเนียมการศึกษา",
        "Request for Postpone Tuition and Fee Payments"
      ),
      className: "text-green-600 font-medium"
    }
  ]

  return (
    <div className="w-full py-6 flex flex-col items-center gap-4">
      {/* Header */}
      <Card className="w-full max-w-6xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbItems.map((item, index) => (
              <span key={index} className={item.className || ""}>
                {item.label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Button
                type={language === Language.TH ? "link" : "text"}
                onClick={() => onLanguageSwitch(Language.TH)}
              >
                {Language.TH}
              </Button>
              /
              <Button
                type={language === Language.EN ? "link" : "text"}
                onClick={() => onLanguageSwitch(Language.EN)}
              >
                {Language.EN}
              </Button>
            </div>
            <ArrowRightOutlined
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => navigate("/demo")}
            />
          </div>
        </div>
      </Card>

      {/* PipelinePage */}
      <PipelinePage currentStep={1} />

      {/* PostponeTuitionFormPage */}
      <PostponeTuitionFormPage onFormChange={setFormData} />

      {/* SubmitButton */}
      <SubmitButton formData={formData} />
    </div>
  )
}

export default RequestForPostponeTuitionandFeePaymentsDetail
