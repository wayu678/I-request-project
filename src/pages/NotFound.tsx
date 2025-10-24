import { useTranslate } from "../provider/hooks/translate.hook";

const NotFound = () => {
    const { translate } = useTranslate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    {translate('ไม่พบหน้าที่คุณกำลังมองหา', 'Page Not Found')}
                </h2>
                <p className="text-gray-500 mb-8">
                    {translate('ขออภัย หน้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ', 'Sorry, the page you are looking for does not exist in the system')}
                </p>
                <a
                    href="/"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    {translate('กลับสู่หน้าแรก', 'Back to Home')}
                </a>
            </div>
        </div>
    )
}

export default NotFound