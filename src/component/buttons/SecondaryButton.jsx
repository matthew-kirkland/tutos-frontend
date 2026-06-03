const sizeMap = {
  "sm": "min-w-24 py-1 px-2 text-sm",
  "md": "min-w-32 py-2 px-4 text-sm",
  "lg": "min-w-48 py-2 px-4 text-sm",
  "xl": "min-w-64 py-2 px-6 text-sm"
};

export const SecondaryButton = ({width, text, onClick, isLink}) => {
  return (
    <button className={`flex justify-center items-center rounded-md cursor-pointer ${sizeMap[size]} bg-white text-theme hover:secondary-hover mb-3`} onClick={onClick}>
      {text}
    </button>
  )
};