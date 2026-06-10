import { Link } from "react-router-dom";
import { cn } from "../../utils/cn.js";

const variantMap = {
  "primary": "bg-theme text-white hover:primary-hover",
  "secondary": "bg-white text-theme hover:secondary-hover",
  "transparent": "bg-transparent text-black hover:bg-gray-100"
};

export const Button = ({className, type, variant, onClick, disabled, isLink, href, target, children}) => {
  return (
    isLink
    ?
      <Link
        className={cn(variantMap[variant], className)}
        to={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
      >
        {children}
      </Link>
    :
    <button type={type} disabled={disabled} className={cn(variantMap[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
};