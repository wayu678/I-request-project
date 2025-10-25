import { useState } from "react"
import PipelinePage from "./PipelinePage"
import StudentForm from "./StudentForm"
import ActionButton from "./ActionButton"

const RequestForPostponeTuitionandFeePayments = () => {
    // State สำหรับเก็บข้อมูลจากฟอร์ม
    const [studentData, setStudentData] = useState<any>(null)

    return (
        <div className="bg-gray-100 pt-0 pb-3 px-3">
            <div className="max-w-7xl mx-auto flex flex-col gap-3">
                {/* PipelinePage */}
                <PipelinePage currentStep={0} />

                {/* StudentForm */}
                <StudentForm onFormChange={setStudentData} />

                {/* ActionButton */}
                <ActionButton studentData={studentData} mode="save" />
            </div>
        </div>
    )
}

export default RequestForPostponeTuitionandFeePayments
