const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
                {/* Outer gradient ring */}
                <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-purple-500/30 border-r-purple-900/10 animate-spin"></div>

                {/* Inner gradient ring */}
                <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-transparent border-b-purple-500/30 border-l-purple-900/10 animate-spin-reverse"></div>

                {/* Center dot */}
                <div className="absolute w-2 h-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/70 to-purple-900/30"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
