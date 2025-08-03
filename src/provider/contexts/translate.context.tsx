import { createContext } from 'react'
import type { TranslateContextType } from '../provider/translate.provider'

const Language = {
    TH: 'TH',
    EN: 'EN'
} as const

export const TranslateContext = createContext<TranslateContextType>({
    language: Language.TH,
    setLanguage: () => { },
    translate: (th: string, en: string) => th || en
})