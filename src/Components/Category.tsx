import { FC} from "react";
import { Card } from "./Card";
import { CategoryType } from "../Types/Category";
import "./Category.css"
interface Props {
    category: CategoryType
}
export const Category: FC<Props> = ({ category }) => {
    return (
        <Card vertical={false} to={category.id} bg={category.color}>
            <h4 className="fit-content">{category.name}</h4>
            <input type="button" value="remove" className="fit-content"/>
        </Card>
    )
}