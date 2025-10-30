import React from 'react';
import { useForm } from 'react-hook-form';
import { IreTextbox, IreButton, IreSelect } from '../../components/utils';
import { useTranslate } from '../../provider/hooks/translate.hook';

interface ManageMasterValueFiltersProps {
    code: string;
    status: string;
    onChange: (field: 'code' | 'status', value: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

const ManageMasterValueFilters: React.FC<ManageMasterValueFiltersProps> = ({
    code,
    status,
    onChange,
    onSearch,
    onClear
}) => {
    const { translate } = useTranslate();
    const formContext = useForm({
        defaultValues: { code, status: status || undefined }
    });

    // sync external state when props change
    React.useEffect(() => { formContext.setValue('code', code); }, [code, formContext]);
    React.useEffect(() => { formContext.setValue('status', status || undefined); }, [status, formContext]);

    // propagate changes up to parent when user types
    const watchCode = formContext.watch('code');
    const watchStatus = formContext.watch('status');
    React.useEffect(() => { onChange('code', watchCode ?? ''); }, [watchCode, onChange]);
    React.useEffect(() => { onChange('status', (watchStatus ?? '') as string); }, [watchStatus, onChange]);

    const statusOptions = React.useMemo(() => ([
        { label: translate('ใช้งาน', 'Active'), value: 'ACTIVE' },
        { label: translate('ปิดใช้งาน', 'Inactive'), value: 'INACTIVE' }
    ]), [translate]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
                <IreTextbox
                    label={translate('รหัสค่าหลัก', 'Master Code')}
                    placeholder={translate('รหัสค่าหลัก', 'Master Code')}
                    formContext={formContext}
                    registerName={formContext.register('code')}
                />
            </div>
            <div>
                <IreSelect
                    label={translate('สถานะ', 'Status')}
                    placeholder={translate('ใช้งาน/ปิดใช้งาน', 'Active/Inactive')}
                    formContext={formContext}
                    registerName={formContext.register('status')}
                    options={statusOptions}
                />
            </div>
            <div className="flex justify-center gap-4 mt-2 md:col-span-2">
                <IreButton label={translate('ค้นหา', 'Search')} color="green" variant="solid" onClick={onSearch} height={40} width={90} />
                <IreButton
                    label={translate('ล้างค่า', 'Clear')}
                    color="green"
                    variant="outlined"
                    onClick={() => {
                        formContext.reset({ code: '', status: undefined });
                        onClear();
                    }}
                    height={40}
                    width={90}
                />
            </div>
        </div>
    );
};

export default ManageMasterValueFilters;


