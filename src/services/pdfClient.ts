import { Configuration } from './generated-api/runtime';
import { Irst07PostponeTuitionFeePaymentRequestApi } from './generated-api/apis/IRST07PostponeTuitionFeePaymentRequestApi';

const config = new Configuration({ credentials: 'include' });

export async function getPostponePdfBlobUrl(uuid: string): Promise<string> {
    const api = new Irst07PostponeTuitionFeePaymentRequestApi(config);
    const response = await api.getPostponeTuitionFeePdfRaw({ uuid });
    const ab = await response.raw.arrayBuffer();
    const blob = new Blob([ab], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}

export async function previewPostponePdf(uuid: string): Promise<void> {
    const blobUrl = await getPostponePdfBlobUrl(uuid);
    window.open(blobUrl, '_blank');
    // Clean up blob URL after a delay (to allow browser to load it)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}





