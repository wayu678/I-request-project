import { Flex, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface IreDisplayFieldProps {
    label?: string;
    value?: string;
    className?: string;
    showEditIcon?: boolean;
}

const IreDisplayField = ({
    label,
    value,
    className = "",
    showEditIcon = true
}: IreDisplayFieldProps) => {
    return (
        <Flex vertical className={`gap-1 w-full ${className}`}>
            <Text className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.75)' }}>
                {label}
            </Text>
            <Flex align="center" gap={8}>
                <Text className="text-base font-medium text-gray-900">
                    {value || "-"}
                </Text>
                {showEditIcon && (
                    <EditOutlined
                        style={{
                            color: '#22C55E',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default IreDisplayField;
