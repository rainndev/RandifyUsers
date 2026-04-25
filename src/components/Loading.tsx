import { ThreeDot } from "react-loading-indicators";
const Loading = () => {
  return (
    <div className="h-dvh w-full flex flex-col justify-center items-center bg-[#212121]">
      <ThreeDot
        variant="bounce"
        color="oklch(87.9% 0.169 91.605)"
        size="large"
        text="Loading..."
        textColor=""
      />
    </div>
  );
};

export default Loading;
