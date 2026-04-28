export const SecondaryButton = ({text}) => {
  return (
    <button className="flex justify-center items-center min-w-24 bg-white text-theme px-4 py-1 rounded-sm hover:cursor-pointer hover:secondary-hover">{text}</button>
  )
}