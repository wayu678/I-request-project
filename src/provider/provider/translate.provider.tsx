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
    const [language, setLanguage] = useState<LANGUAGE>(localStorage.getItem('lang') as LANGUAGE || LANGUAGE.TH);

    useEffect(() => {
        localStorage.setItem('lang', language);
    }, [setLanguage]);

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