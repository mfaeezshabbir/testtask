export default function ProgressBar({ percentage }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-56 h-7 bg-gray-300 rounded-md overflow-hidden relative">
                <div
                    className="bg-[#1AA796] h-full relative"
                    style={{ width: `${percentage}%` }}
                >
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 text-sm font-medi2m text-white">
                        {percentage}%
                    </span>
                </div>
            </div>
        </div>
    );
}
