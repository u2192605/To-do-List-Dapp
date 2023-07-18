import React, { FC } from "react";
import './Card.css'
import { Link } from "react-router-dom";
import { inherits } from "util";

interface Props {
    children: React.ReactNode
    vertical: boolean
    to?: string
    bg?: string
}
export const Card: FC<Props> = ({ children, vertical, to, bg }) => {
    return vertical ? (
        <div className={"card-vertical"}>
            {children}
        </div>
    ) :
        (
            <div className={"card-horizontal"} style={{backgroundColor: bg??"FFFFFFF"}}>
                {to ?
                    <Link to={to} className="link">
                        {children}
                    </Link> : children

                }
            </div>
        )
}