import { useContext } from 'react'
import { TranslateContext } from '../contexts/translate.context'

export const useTranslate = () => {
    return useContext(TranslateContext)
}