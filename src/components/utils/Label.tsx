interface LabelProps {
    label: string
    children: React.ReactNode
}

const Label = ({ label, children }: LabelProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{label}</label>
            {children}
        </div>
    )
}

export default Label