import { Configuration, ResponseError } from './generated-api/runtime';
import { Irst07PostponeTuitionFeePaymentRequestApi } from './generated-api/apis/IRST07PostponeTuitionFeePaymentRequestApi';
import { message } from 'antd';

const config = new Configuration({
    basePath: '/api', // เพิ่ม basePath เพื่อให้ API เรียกไปที่ /api
    credentials: 'include'
});

export async function getPostponePdfBlobUrl(uuid: string): Promise<string> {
    try {
        if (!uuid) {
            throw new Error('UUID is required');
        }

        const api = new Irst07PostponeTuitionFeePaymentRequestApi(config);
        const response = await api.getPostponeTuitionFeePdfRaw({ uuid });

        // ตรวจสอบว่า response มีข้อมูลหรือไม่
        if (!response || !response.raw) {
            throw new Error('Invalid response from server');
        }

        // ใช้ blob() แทน arrayBuffer() เพื่อรองรับ binary data ได้ดีกว่า
        const blob = await response.raw.blob();

        // ตรวจสอบว่า blob มีข้อมูลหรือไม่
        if (!blob || blob.size === 0) {
            throw new Error('PDF file is empty');
        }

        // ตรวจสอบ content type
        const contentType = blob.type || response.raw.headers.get('content-type') || '';
        if (!contentType.includes('application/pdf') && blob.size > 0) {
            console.warn('[getPostponePdfBlobUrl] Unexpected content type:', contentType);
            // ไม่ throw error เพราะอาจจะเป็น PDF แม้ content-type ไม่ถูกต้อง
        }

        return URL.createObjectURL(blob);
    } catch (error: any) {
        console.error('[getPostponePdfBlobUrl] Error:', error);

        // จัดการกับ ResponseError จาก generated API
        if (error instanceof ResponseError && error.response) {
            const status = error.response.status;
            const statusText = error.response.statusText;

            // พยายามอ่าน error message จาก response
            let errorText = '';
            try {
                const errorClone = error.response.clone();
                errorText = await errorClone.text().catch(() => '');
            } catch (e) {
                // ไม่สามารถอ่าน error text ได้
            }

            if (status === 401) {
                throw new Error('Unauthorized: คุณไม่มีสิทธิ์เข้าถึง PDF นี้');
            } else if (status === 404) {
                throw new Error('Not Found: ไม่พบ PDF ที่ต้องการ');
            } else if (status === 400) {
                throw new Error(`Bad Request: ${errorText || 'ข้อมูลไม่ถูกต้อง'}`);
            } else if (status >= 500) {
                throw new Error(`Server Error: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (${status})`);
            } else {
                throw new Error(`HTTP ${status} ${statusText}: ${errorText || 'ไม่สามารถดาวน์โหลด PDF ได้'}`);
            }
        }

        // ถ้าเป็น network error ให้เพิ่มข้อมูลเพิ่มเติม
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
            throw new Error('Network error: Could not connect to server. Please check your internet connection.');
        }

        throw error;
    }
}

export async function previewPostponePdf(uuid: string): Promise<void> {
    try {
        if (!uuid) {
            message.error('ไม่พบ UUID สำหรับดาวน์โหลด PDF');
            return;
        }

        const blobUrl = await getPostponePdfBlobUrl(uuid);

        if (!blobUrl) {
            message.error('ไม่สามารถสร้าง URL สำหรับ PDF ได้');
            return;
        }

        window.open(blobUrl, '_blank');
        // Clean up blob URL after a delay (to allow browser to load it)
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000); // เพิ่มเวลาเป็น 10 วินาที
    } catch (error: any) {
        console.error('[previewPostponePdf] Error:', error);

        // แสดง error message ที่เป็นมิตรกับผู้ใช้
        let errorMessage = 'ไม่สามารถดาวน์โหลด PDF ได้';

        if (error.message) {
            if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                errorMessage = 'คุณไม่มีสิทธิ์เข้าถึง PDF นี้';
            } else if (error.message.includes('404') || error.message.includes('Not Found')) {
                errorMessage = 'ไม่พบ PDF ที่ต้องการ';
            } else if (error.message.includes('Network') || error.message.includes('fetch')) {
                errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย กรุณาลองใหม่อีกครั้ง';
            } else {
                errorMessage = `ไม่สามารถดาวน์โหลด PDF ได้: ${error.message}`;
            }
        }

        message.error(errorMessage);
        throw error;
    }
}





