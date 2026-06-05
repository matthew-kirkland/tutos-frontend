import { Button } from "../component/buttons/Button";

export const LandingPage = () => {
  return (
    <div className="flex h-full justify-between items-center">
      <div className="w-1/2 h-full">
        <div className="h-full w-full flex justify-center items-center border-r border-dashed border-theme bg-gray-200">Placeholder for image</div>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <h1 className="text-theme text-4xl font-medium tracking-wide pb-8">Welcome</h1>
        <Button
          className="flex justify-center items-center rounded-md cursor-pointer min-w-64 py-2 px-4 text-sm"
          variant="primary"
          isLink={true}
          href="/login"
        >
          Login
        </Button>
      </div>
    </div>
  );
};