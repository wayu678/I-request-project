import { useState, useMemo, useEffect } from 'react'
import { TranslateContext } from '../contexts/translate.context'

const Language = {
    TH: 'TH',
    EN: 'EN'
} as const

type Language = typeof Language[keyof typeof Language];

export interface TranslateContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translate: (th: string, en: string) => string;
}

const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>(localStorage.getItem('lang') as Language || Language.TH);

    useEffect(() => {
        localStorage.setItem('lang', language);
    }, [setLanguage]);

    const translate = (th: string, en: string) => {
        return language.toUpperCase() === Language.TH ? th : en
    }

    const value = useMemo<TranslateContextType>(() => ({
        language,
        setLanguage: (lang: Language) => setLanguage(lang),
        translate
    }), [language, setLanguage]);

    return (
        <TranslateContext.Provider value={value}>
            {children}
        </TranslateContext.Provider>
    )
}

export default TranslateProvider