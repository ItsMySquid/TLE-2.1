import useDarkMode from "./useDarkMode";

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode(!isDarkMode)}
                    className="sr-only"
                />
                <div className="block border border-gray-900 dark:border-white w-14 h-8 rounded-full"></div>
                <div className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition
                                ${isDarkMode ? "translate-x-6 bg-white" : "bg-gray-800"}`}></div>
            </div>
            <span className="ml-3 text-gray-900 dark:text-white font-medium">Dark Mode</span>
        </label>
    );
}
