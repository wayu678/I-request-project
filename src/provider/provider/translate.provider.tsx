import { useState, useMemo, useEffect } from 'react'
import { TranslateContext } from '../contexts/translate.context'

const LANGUAGE = {
    TH: 'TH',
    EN: 'EN'
} as const

type LANGUAGE = typeof LANGUAGE[keyof typeof LANGUAGE];

export interface TranslateContextType {
    language: LANGUAGE;
    setLanguage: (lang: LANGUAGE) => void;
    translate: (th: string, en: string) => string;
}

const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
    // บังคับให้เริ่มต้นด้วยภาษาไทยเสมอ โดยไม่สนใจ localStorage
    const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.TH);

    useEffect(() => {
        // ตรวจสอบว่า localStorage มีค่า 'EN' หรือไม่ ถ้ามีให้ล้างออก
        const storedLang = localStorage.getItem('lang');
        if (storedLang === 'EN') {
            localStorage.removeItem('lang');
        }
        // บังคับให้เริ่มต้นด้วยภาษาไทยเสมอ
        localStorage.setItem('lang', LANGUAGE.TH);
    }, []);

    useEffect(() => {
        // อัปเดต localStorage เมื่อมีการเปลี่ยนภาษา
        localStorage.setItem('lang', language);
    }, [language]);

    const translate = (th: string, en: string) => {
        return language.toUpperCase() === LANGUAGE.TH ? th : en
    }

    const value = useMemo<TranslateContextType>(() => ({
        language,
        setLanguage: (lang: LANGUAGE) => setLanguage(lang),
        translate
    }), [language, setLanguage]);

    return (
        <TranslateContext.Provider value={value}>
            {children}
        </TranslateContext.Provider>
    )
}

export default TranslateProvider