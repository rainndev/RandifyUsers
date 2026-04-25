interface ErrorUIProps {
  message: string | null;
}

const ErrorUI = ({ message }: ErrorUIProps) => {
  return (
    <div className="h-dvh w-full flex flex-col justify-center items-center bg-[#212121] text-amber-300">
      <img src="./speed-error.png" alt="error-image" width={300} />
      <p className="mt-10 text-lg">
        error: {message ?? "An unknown error occurred."}
      </p>
    </div>
  );
};

export default ErrorUI;
