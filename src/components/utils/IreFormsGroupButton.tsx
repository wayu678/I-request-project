import { Button, Flex, Row } from "antd";
import { useTranslate } from "../../provider/hooks/translate.hook";


interface IreFormsGroupButton {
    justify?: "start" | "end" | "center";
    stage: 'draft' | 'processing' | null;
    currentStep: number;
    onSave?: () => void;
    onSubmit?: () => void;
    onCancel?: () => void;
    onApprove?: () => void;
    onReject?: () => void;
}

const IreFormsGroupButton = ({
    justify = "end",
    stage = 'draft',
    currentStep,
    onSave,
    onSubmit,
    onCancel,
    onApprove,
    onReject,
}: IreFormsGroupButton) => {
    const { translate } = useTranslate();

    return (
        <Flex justify={justify} gap={16}>
            {
                stage == 'draft' && currentStep == 0 && (
                    <Button
                        type="default"
                        size="large"
                        onClick={onSave}
                    >
                        {translate("บันทึก", "Save")}
                    </Button>
                )
            }
            {
                stage == 'draft' && currentStep == 1 && (
                    <Button
                        type="primary"
                        size="large"
                        onClick={onSubmit}
                    >
                        {translate("ส่งอนุมัติ", "Submit")}
                    </Button>
                )
            }
            {
                stage == 'draft' && currentStep == 1 && (
                    <Button
                        type="primary"
                        size="large"
                        onClick={onCancel}
                    >
                        {translate("ยกเลิก", "Cancel")}
                    </Button>
                )
            }
            {
                stage == 'processing' && (
                    <Button
                        type="primary"
                        size="large"
                        onClick={onApprove}
                    >
                        {translate("ปฏิเสธ", "Reject")}
                    </Button>
                )
            }
            {
                stage == 'processing' && (
                    <Button
                        type="primary"
                        size="large"
                        onClick={onReject}
                    >
                        {translate("อนุมัติ", "Approve")}
                    </Button>
                )
            }
        </Flex>
    )
}

export default IreFormsGroupButton;