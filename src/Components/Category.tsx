import React, { FC, Fragment } from "react";
import { Card } from "./Card";
interface Props{
    title: string;
}
export const Category: FC<Props> = ({title}) => {
    return (
        <Card vertical={false}>
            <h4>{title}</h4>
        </Card>
    )
}