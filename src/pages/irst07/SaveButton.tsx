import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";

interface SaveButtonProps {
  studentData?: any;
}

const SaveButton = ({ studentData }: SaveButtonProps) => {
  const navigate = useNavigate();
  const { translate } = useTranslate();

  const handleSave = () => {
    console.log("Save button clicked", studentData);
    // ส่งข้อมูลไปยังหน้า detail ผ่าน state หรือ localStorage
    if (studentData) {
      localStorage.setItem('studentData', JSON.stringify(studentData));
    }
    navigate("/irst07/detail");
  };

  return (
    <div className="w-full max-w-6xl flex justify-end pr-5">
      <Button
        type="primary"
        size="large"
        onClick={handleSave}
        className="rounded-lg"
        style={{
          width: "106px",
          height: "38px",
          backgroundColor: "#339966",
          borderColor: "#339966",
          boxShadow: "none",
        }}
      >
        {translate("บันทึก", "Save")}
      </Button>
    </div>
  );
};

export default SaveButton;
