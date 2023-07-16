import React, { FC, Fragment } from "react";
import { Card } from "./Card";
import { CategoryType } from "../Types/Category";
interface Props{
    category: CategoryType
}
export const Category: FC<Props> = ({category}) => {
    return (
        <Card vertical={false}>
            <h4>{category.name}</h4>
            <input type="button" value="remove"/>
        </Card>
    )
}