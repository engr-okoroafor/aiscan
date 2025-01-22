export default function LoadingIndicator({ message }) {
    return (
      <div className="flex justify-center items-center text-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mr-3"></div>
        <p>{message}</p>
      </div>
    );
  }
  