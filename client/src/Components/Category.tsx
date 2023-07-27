import { FC } from "react";
import { Card } from "./Card";
import { CategoryType } from "../Types/Category";
import { useRemoveCategoryMutation } from "../redux/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface Props {
  category: CategoryType;
}
export const Category: FC<Props> = ({ category }) => {
  const [removeCategory, data] = useRemoveCategoryMutation();

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeCategory(category._id);
  };
  return (
    <Card
      to={category._id}
      bg={category.color}
      state={{ name: category.name }}
    >
      <div className="text-lg">{category.name}</div>
      <button
        onClick={handleRemove}
        className="
      hover:outline-teal-500 hover:border-teal-500
      focus:outline-teal-500 focus-within:border-teal-500
      hover:shadow-xl hover:text-red-500  hover:-rotate-12"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </Card>
  );
};
