import React, {FC} from "react";
import './Card.css'

interface Props{
    children: React.ReactNode
    vertical:  boolean
}
export const Card: FC<Props>= ({children, vertical})=>{
    return (<div className={vertical ? "card-vertical": "card-horizontal"}>
        {children}
    </div>)
}