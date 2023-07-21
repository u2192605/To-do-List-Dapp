import React, { FC } from "react";
import './Card.css'
import { Link } from "react-router-dom";

interface Props {
    children: React.ReactNode
    vertical: boolean
    to?: string
    bg?: string
    state?: any
}
export const Card: FC<Props> = ({ children, vertical, to, bg, state }) => {
    return vertical ? (
        <div className={"card-vertical"}>
            {children}
        </div>
    ) :
        (
            <div className={"card-horizontal"} style={{backgroundColor: bg??"FFFFFFF"}}>
                {to ?
                    <Link to={to} state={state} className="link">
                        {children}
                    </Link> : children

                }
            </div>
        )
}