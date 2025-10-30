import { Card, Steps } from "antd"

export interface Step {
    title: string
    stepNumber: number
    disabled: boolean
}

interface RequestPipelineProps {
    steps: Step[]
    currentStep?: number
    onChangeStep?: (step: number) => void
}

const RequestPipeline = ({
    steps,
    currentStep = 0,
    onChangeStep
}: RequestPipelineProps) => {

    const onClickStep = (step: Step) => {
        if (step.disabled) return;
        onChangeStep?.(step.stepNumber);
    }

    const renderStepTitle = (step: Step) => {
        return <span className={`text-sm ${step.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>{step.title}</span>
    }

    return (
        <Card className="bg-white rounded-lg">
            <Steps
                current={currentStep}
                items={steps?.map((step: Step) => ({
                    title: renderStepTitle(step),
                    disabled: step.disabled,
                    onClick: () => onClickStep(step),
                })) || []}
            />
        </Card>
    )
}

export default RequestPipeline
