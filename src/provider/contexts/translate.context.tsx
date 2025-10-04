import { createContext } from 'react'
import type { TranslateContextType } from '../provider/translate.provider'

const LANGUAGE = {
    TH: 'TH',
    EN: 'EN'
} as const

export const TranslateContext = createContext<TranslateContextType>({
    language: LANGUAGE.TH,
    setLanguage: () => { },
    translate: (th: string, en: string) => th || en
})