export const SecondaryButton = ({width, text, onClick}) => {
  return (
    <button className={`flex justify-center items-center ${width} bg-white text-theme px-4 py-2 rounded-md cursor-pointer hover:secondary-hover`} onClick={onClick}>
      {text}
    </button>
  )
}