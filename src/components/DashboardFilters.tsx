import React from 'react';
import { Flex } from 'antd';
import { IreSelect, IreCalendar } from './utils';
import { useTranslate } from '../provider/hooks/translate.hook';
import { createSemesterOptions, createRequestTypeOptions } from '../utils/dashboardUtils';

interface DashboardFiltersProps {
    formContext: any; // UseFormReturn type
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ formContext }) => {
    const { translate } = useTranslate();

    const semesterOptions = createSemesterOptions(translate);
    const requestTypeOptions = createRequestTypeOptions(translate);

    const renderIreCalendar = (label: string, field: "month" | "academicYear", placeholder: string, format: string | "MM" | "YYYY") => (
        <IreCalendar
            label={label}
            formContext={formContext}
            registerName={formContext.register(field)}
            placeholder={placeholder}
            format={format}
            widthFull={true}
        />
    );

    return (
        <div className="p-5">
            <Flex vertical gap={4} className="w-full max-w-md">
                {renderIreCalendar(translate("เดือน", "Month"), "month", "MM", "MM")}
                <IreSelect
                    label={translate("เทอม", "Semester")}
                    placeholder={translate("ภาคต้น, ภาคปลาย, ภาคฤดูร้อน", "First Semester, Second Semester, Summer Semester")}
                    formContext={formContext}
                    registerName={formContext.register('semester')}
                    options={semesterOptions}
                    widthFull={true}
                />
                {renderIreCalendar(translate("ปีการศึกษา", "Academic Year"), "academicYear", "YYYY", "YYYY")}
                <IreSelect
                    label={translate("ประเภทคำร้อง", "Request Type")}
                    placeholder={translate("คำร้องทั่วไป", "General Request")}
                    formContext={formContext}
                    registerName={formContext.register('requestType')}
                    options={requestTypeOptions}
                    widthFull={true}
                />
            </Flex>
        </div>
    );
};

export default DashboardFilters;
