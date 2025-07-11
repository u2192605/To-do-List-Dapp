import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to?: string;
  bg?: string;
  state?: any;
  onClick?: () => void;
}

export const Card: FC<Props> = ({ children, to, bg, state, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-12 flex justify-between items-center 
        border-2 border-black rounded-md pl-4 pr-4
        hover:outline-teal-500 hover:border-teal-500
        focus:outline-teal-500 focus-within:border-teal-500
        hover:shadow-xl"
      style={{ backgroundColor: bg ?? "FFFFFFF" }}
    >
      {to ? (
        <Link to={to} state={state} className="flex justify-between w-full">
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  );
};
