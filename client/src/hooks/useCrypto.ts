import { useState, useCallback, useEffect } from 'react';

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

const isBrowser = () => typeof window !== 'undefined';

export function useCrypto() {
    const algorithm = { name: 'AES-CBC', length: 128 };
    const iv = new Uint8Array(16);
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const getKey = useCallback(async () => {
        if (cryptoKey) {
            return cryptoKey;
        }
        
        if (!isBrowser() || typeof crypto === 'undefined' || !crypto.subtle) {
            throw new Error('Web Crypto API não está disponível neste ambiente');
        }
        
        try {
            const secret = 'default_secret_16';
            const rawKey = new TextEncoder().encode(secret.slice(0, 16));
            const key = await crypto.subtle.importKey('raw', rawKey, algorithm, false, ['encrypt', 'decrypt']);
            
            setCryptoKey(key);
            return key;
        } catch (error) {
            console.error('Erro ao gerar chave criptográfica:', error);
            throw error;
        }
    }, [cryptoKey]);

    const encrypt = async (data: string): Promise<string> => {
        if (!isClient) {
            console.warn('Tentativa de criptografar durante SSR - operação adiada para o lado do cliente');
            return '';
        }

        try {
            const key = await getKey();
            const encodedData = new TextEncoder().encode(data);
            const encrypted = await crypto.subtle.encrypt({ name: algorithm.name, iv }, key, encodedData);
            return base64UrlEncode(encrypted);
        } catch (error) {
            console.error('Erro ao criptografar:', error);
            throw error;
        }
    };

    const decrypt = async (encryptedText: string): Promise<string> => {
        if (!isClient) {
            console.warn('Tentativa de descriptografar durante SSR - operação adiada para o lado do cliente');
            return '';
        }

        try {
            if (!encryptedText) return '';
            
            const key = await getKey();
            const decrypted = await crypto.subtle.decrypt({ name: algorithm.name, iv }, key, base64UrlDecode(encryptedText));
            return new TextDecoder().decode(decrypted);
        } catch (error) {
            console.error('Erro ao descriptografar:', error);
            throw error;
        }
    };

    return {
        encrypt,
        decrypt,
        isClient,
    };
}