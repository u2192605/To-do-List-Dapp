import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    className: string,
    children: React.ReactNode
    vertical: boolean
    to?: string
    bg?: string
    state?: any
}
export const Card: FC<Props> = ({className, children, vertical, to, bg, state }) => {
    return vertical ? (
        <div className={className}>
            {children}
        </div>
    ) :
        (
            <div className={className} 
            style={{backgroundColor: bg??"FFFFFFF"}}>
                {to ?
                    <Link to={to} state={state} className="flex justify-between w-full">
                        {children}
                    </Link> : children

                }
            </div>
        )
}