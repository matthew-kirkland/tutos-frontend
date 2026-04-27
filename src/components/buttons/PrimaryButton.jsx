export const PrimaryButton = ({text}) => {
  return (
    <button className="flex justify-center items-center bg-theme text-white px-4 py-1 rounded-sm hover:cursor-pointer hover:primary-hover">{text}</button>
  )
}