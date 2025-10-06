import { Button, Flex, Upload } from "antd";
import type { UploadFile, RcFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface IreUploadProps {
    label?: string;
    placeholder?: string; // not used, kept for api parity
    formContext: UseFormReturn<any>;
    registerName: UseFormRegisterReturn;
    isRequired?: boolean;
    errorMessage?: string;
    widthFull?: boolean;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    maxCount?: number;
}

const IreUpload = ({
    label,
    formContext,
    registerName,
    isRequired = false,
    widthFull = true,
    errorMessage,
    accept,
    multiple = false,
    disabled = false,
    maxCount = 1
}: IreUploadProps) => {
    const name = registerName.name as string;
    const value = (formContext.getValues(name) as UploadFile[] | undefined) ?? [];

    const onChange = ({ fileList }: { fileList: UploadFile[] }) => {
        formContext.setValue(name, fileList as any);
        formContext.clearErrors(name);
    };

    const currentFile = value?.[0];
    const previewUrl: string | undefined = (() => {
        if (!currentFile) return undefined;
        if (currentFile.url) return currentFile.url;
        const origin = currentFile.originFileObj as RcFile | undefined;
        return origin ? URL.createObjectURL(origin) : undefined;
    })();

    return (
        <>
            <Flex vertical className={`gap-1 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`}>
                    {label}
                </label>
                <div className="flex items-center gap-4">
                    <Upload
                        beforeUpload={() => false}
                        fileList={value}
                        onChange={onChange}
                        showUploadList={false}
                        multiple={multiple}
                        disabled={disabled}
                        accept={accept}
                        maxCount={maxCount}
                    >
                        <Button color="green" type="default" icon={<PlusOutlined />}>Choose</Button>
                    </Upload>
                    {currentFile && (
                        previewUrl ? (
                            <a className="text-blue-600" href={previewUrl} target="_blank" rel="noreferrer">
                                {currentFile.name}
                            </a>
                        ) : (
                            <span>{currentFile.name}</span>
                        )
                    )}
                </div>
                {
                    formContext.formState.errors[name] && !errorMessage ? (
                        <label className="text-red-500">Invalid file</label>
                    ) : null
                }
                {
                    errorMessage && (
                        <label className="text-red-500">{errorMessage}</label>
                    )
                }
            </Flex>
        </>
    );
};

export default IreUpload;


