import { FC } from "react";
import { Card } from "./Card";
import { CategoryType } from "../Types/Category";
import styles from "./styles/Category.module.css";
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
      vertical={false}
      to={category._id}
      bg={category.color}
      state={{ name: category.name }}
    >
      <h4 className={styles.fitContent}>{category.name}</h4>
      <button className={styles.fitContent} onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </Card>
  );
};
