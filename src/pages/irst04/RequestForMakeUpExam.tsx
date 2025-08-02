import { useNavigate } from "react-router-dom"

const RequestForMakeUpExam = () => {
    const navigate = useNavigate()

    return (
        <div>
            RequestForMakeUpExam
            <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={() => {
                    navigate("/irst04/detail")
                }}
            >
                Detail</button>
        </div>
    )
}

export default RequestForMakeUpExam