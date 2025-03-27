import { useState } from 'react';

const base64UrlEncode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

const base64UrlDecode = (input: string): Uint8Array => {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return new Uint8Array(
        atob(base64)
            .split('')
            .map((c) => c.charCodeAt(0))
    );
};

export function useCrypto() {
    const algorithm = { name: 'AES-CBC', length: 128 };
    const iv = new Uint8Array(16);
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

    const getKey: () => Promise<{
        readonly algorithm: {
            name: string;
        };
        readonly extractable: boolean;
        readonly type: KeyType;
        readonly usages: KeyUsage[];
    } | null> = async () => {
        if (!cryptoKey) {
            const secret = import.meta.env.VITE_CRYPTO_SECRET_KEY || 'default_secret_16';
            const rawKey = new TextEncoder().encode(secret.slice(0, 16));
            const key = await crypto.subtle.importKey('raw', rawKey, algorithm, false, ['encrypt', 'decrypt']);
            setCryptoKey(key);
        }
        return cryptoKey;
    };

    const encrypt = async (data: string): Promise<string | void> => {
        const key = await getKey();
        const encodedData = new TextEncoder().encode(data);
        if (key) {
            const encrypted = await crypto.subtle.encrypt({ name: algorithm.name, iv }, key, encodedData);
            return base64UrlEncode(encrypted);
        }
    };

    const decrypt = async (encryptedText: string): Promise<string | void> => {
        const key = await getKey();
        if (key) {
            const decrypted = await crypto.subtle.decrypt({ name: algorithm.name, iv }, key, base64UrlDecode(encryptedText));
            return new TextDecoder().decode(decrypted);
        }
    };

    return {
        encrypt,
        decrypt,
    };
}
