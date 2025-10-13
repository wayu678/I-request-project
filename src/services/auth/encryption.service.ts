// Encryption Service
// ตามเงื่อนไขในรูปภาพ: Component 'b' - (private data) encrypt first

export interface EncryptedData {
    encrypted: string;
    iv: string;
    salt: string;
}

class EncryptionService {
    private readonly ALGORITHM = 'AES-GCM';
    private readonly KEY_LENGTH = 256;
    private readonly IV_LENGTH = 12;
    private readonly SALT_LENGTH = 16;

    // สร้าง Key จาก Password
    private async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: this.ALGORITHM, length: this.KEY_LENGTH },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // เข้ารหัสข้อมูลส่วนตัว (Component 'b' functionality)
    async encryptPrivateData(data: any, password: string): Promise<EncryptedData> {
        try {
            const encoder = new TextEncoder();
            const dataString = JSON.stringify(data);
            const dataBuffer = encoder.encode(dataString);

            // สร้าง Salt และ IV
            const salt = crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
            const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));

            // สร้าง Key
            const key = await this.deriveKey(password, salt);

            // เข้ารหัสข้อมูล
            const encryptedBuffer = await crypto.subtle.encrypt(
                {
                    name: this.ALGORITHM,
                    iv: iv
                },
                key,
                dataBuffer
            );

            // แปลงเป็น Base64
            const encrypted = this.arrayBufferToBase64(encryptedBuffer);
            const saltBase64 = this.arrayBufferToBase64(salt);
            const ivBase64 = this.arrayBufferToBase64(iv);

            return {
                encrypted,
                iv: ivBase64,
                salt: saltBase64
            };
        } catch (error) {
            console.error('Encryption failed:', error);
            throw new Error('Failed to encrypt private data');
        }
    }

    // ถอดรหัสข้อมูลส่วนตัว (Component 'f' functionality)
    async decryptPrivateData(encryptedData: EncryptedData, password: string): Promise<any> {
        try {
            // แปลงจาก Base64
            const encryptedBuffer = this.base64ToArrayBuffer(encryptedData.encrypted);
            const salt = this.base64ToArrayBuffer(encryptedData.salt);
            const iv = this.base64ToArrayBuffer(encryptedData.iv);

            // สร้าง Key
            const key = await this.deriveKey(password, new Uint8Array(salt));

            // ถอดรหัสข้อมูล
            const decryptedBuffer = await crypto.subtle.decrypt(
                {
                    name: this.ALGORITHM,
                    iv: new Uint8Array(iv)
                },
                key,
                encryptedBuffer
            );

            // แปลงเป็น String
            const decoder = new TextDecoder();
            const decryptedString = decoder.decode(decryptedBuffer);

            return JSON.parse(decryptedString);
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Failed to decrypt private data');
        }
    }

    // เข้ารหัสข้อมูล Profile
    async encryptProfileData(profileData: any): Promise<EncryptedData> {
        // ใช้ User ID หรือ Token เป็น Password สำหรับการเข้ารหัส
        const password = tokenService.getUserId() || 'default_password';
        return this.encryptPrivateData(profileData, password);
    }

    // ถอดรหัสข้อมูล Profile
    async decryptProfileData(encryptedData: EncryptedData): Promise<any> {
        const password = tokenService.getUserId() || 'default_password';
        return this.decryptPrivateData(encryptedData, password);
    }

    // Helper functions
    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // ตรวจสอบว่าข้อมูลถูกเข้ารหัสหรือไม่
    isEncrypted(data: any): boolean {
        return data && typeof data === 'object' && 
               'encrypted' in data && 
               'iv' in data && 
               'salt' in data;
    }
}

export const encryptionService = new EncryptionService();
