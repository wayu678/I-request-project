import { ResponseError } from '../generated-api/runtime';
import { postponeTuitionService } from './postponeTuitionService';
import { message } from 'antd';

export async function getPostponePdfBlobUrl(uuid: string): Promise<string> {
    try {
        console.log('[getPostponePdfBlobUrl] Starting with UUID:', uuid);

        if (!uuid) {
            throw new Error('UUID is required');
        }

        // ใช้ API client จาก folder api
        console.log('[getPostponePdfBlobUrl] Calling postponeTuitionService.getPostponeTuitionFeePdf...');
        const blob = await postponeTuitionService.getPostponeTuitionFeePdf(uuid);
        console.log('[getPostponePdfBlobUrl] Received blob:', { size: blob.size, type: blob.type });

        const blobUrl = URL.createObjectURL(blob);
        console.log('[getPostponePdfBlobUrl] Created blob URL:', blobUrl);
        return blobUrl;
    } catch (error: any) {
        console.error('[getPostponePdfBlobUrl] Error:', error);

        // จัดการกับ ResponseError
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
        console.log('[previewPostponePdf] Starting preview with UUID:', uuid);

        if (!uuid) {
            const errorMsg = 'ไม่พบ UUID สำหรับดาวน์โหลด PDF';
            console.error('[previewPostponePdf]', errorMsg);
            message.error(errorMsg);
            return;
        }

        console.log('[previewPostponePdf] Getting blob URL...');
        const blobUrl = await getPostponePdfBlobUrl(uuid);

        if (!blobUrl) {
            const errorMsg = 'ไม่สามารถสร้าง URL สำหรับ PDF ได้';
            console.error('[previewPostponePdf]', errorMsg);
            message.error(errorMsg);
            return;
        }

        console.log('[previewPostponePdf] Opening PDF in new window...');
        const newWindow = window.open(blobUrl, '_blank');

        if (!newWindow) {
            // Popup blocked - fallback to download
            console.warn('[previewPostponePdf] Popup blocked, creating download link instead');
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `postpone_tuition_${uuid}.pdf`;
            link.click();
            message.info('ได้ทำการดาวน์โหลด PDF เนื่องจาก popup ถูกบล็อก');
        }

        // Clean up blob URL after a delay (to allow browser to load it)
        setTimeout(() => {
            console.log('[previewPostponePdf] Cleaning up blob URL');
            URL.revokeObjectURL(blobUrl);
        }, 10000); // เพิ่มเวลาเป็น 10 วินาที
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

