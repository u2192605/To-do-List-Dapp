import React, { FC } from "react";
import styles from './styles/Card.module.css'
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
        <div className={styles.cardVertical}>
            {children}
        </div>
    ) :
        (
            <div className={styles.cardHorizontal} style={{backgroundColor: bg??"FFFFFFF"}}>
                {to ?
                    <Link to={to} state={state} className={styles.link}>
                        {children}
                    </Link> : children

                }
            </div>
        )
}