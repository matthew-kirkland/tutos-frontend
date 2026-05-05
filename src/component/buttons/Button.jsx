const sizeMap = {
  "sm": "min-w-24 py-1 px-2 text-sm",
  "md": "min-w-32 py-2 px-4 text-sm",
  "lg": "min-w-48 py-2 px-4 text-sm font-bold",
  "xl": "min-w-64 py-2 px-6 text-sm font-bold"
};

const variantMap = {
  "primary": "bg-theme text-white hover:primary-hover",
  "secondary": "bg-white text-theme hover:secondary-hover",
  "transparent": "bg-transparent text-theme hover:bg-gray-100"
}

export const Button = ({variant, size, text, onClick}) => {
  return (
    <button className={`flex justify-center items-center rounded-md cursor-pointer ${sizeMap[size]} ${variantMap[variant]}`} onClick={onClick}>
      {text}
    </button>
  )
}