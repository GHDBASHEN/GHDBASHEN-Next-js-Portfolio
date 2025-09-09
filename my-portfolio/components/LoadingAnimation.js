export default function LoadingAnimation({ isLoading }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 z-50 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="plane-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="plane-mover">
          <div className="plane-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              fill="none"
              className="plane-svg w-20 h-20 text-cyan-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L6 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
