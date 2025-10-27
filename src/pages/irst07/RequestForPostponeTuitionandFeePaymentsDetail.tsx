import { useState } from "react"
import PipelinePage from "./PipelinePage"
import PostponeTuitionFormPage from "./PostponeTuitionFormPage"
import ActionButton from "./ActionButton"
import type { PostponeTuitionFormData } from "../../services/api/postponeTuitionService"

const RequestForPostponeTuitionandFeePaymentsDetail = () => {
  const [formData, setFormData] = useState<Partial<PostponeTuitionFormData>>({}) // เก็บข้อมูล form

  return (
    <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* PipelinePage */}
        <PipelinePage currentStep={1} />

        {/* PostponeTuitionFormPage */}
        <PostponeTuitionFormPage onFormChange={setFormData} />

        {/* ActionButton */}
        <ActionButton formData={formData} mode="submit" />
      </div>
    </div>
  )
}

export default RequestForPostponeTuitionandFeePaymentsDetail
