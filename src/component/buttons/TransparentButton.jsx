const sizeMap = {
  "sm": "min-w-24 py-1 px-2 text-sm",
  "md": "min-w-32 py-2 px-4 text-sm",
  "lg": "min-w-48 py-2 px-4 text-sm",
  "xl": "min-w-64 py-2 px-6 text-sm"
};

const baseClass = (size) => {
  return `flex justify-center items-center rounded-md cursor-pointer ${sizeMap[size]} bg-transparent text-theme hover:bg-gray-100 mb-3`;
};

export const TransparentButton = ({type, size, text, onClick, disabled, isLink, href, target}) => {
  return (
    isLink
    ?
      <a
        className={baseClass(size)}
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
      >
        {text}
      </a>
    :
    <button type={type} disabled={disabled} className={baseClass(size)} onClick={onClick}>
      {text}
    </button>
  );
};