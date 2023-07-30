import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setContent } from "../redux/itemSlice";
import React, { FC } from "react";
import { ItemType } from "../Types/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";
interface Props {
  onAddItem: (item: ItemType) => void;
  isPerformingQuery?: boolean;
}
export const AddItem: FC<Props> = ({
  onAddItem,
  isPerformingQuery: isFetchingData,
}) => {
  const { content } = useSelector((state: RootState) => state.item.input);
  const dispatch = useDispatch();

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContent(event.target.value));
  };

  const clearInput = () => {
    dispatch(setContent(""));
  };

  const handleOnAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddItem({ content });
    clearInput();
  };

  return (
    <div className="fixed bottom-8 left-6 w-full mt-16 flex flex-col justify-center items-center mx-auto">
      <div className="flex space-x-2 w-9/12">
        <input
          type="text"
          placeholder="Enter item name"
          value={content}
          onChange={(event) => handleContentChange(event)}
          onClick={(e) => e.stopPropagation()}
          className="resize-none rounded-md border-2 border-black p-2
            h-12 w-full hover:outline-teal-500 hover:border-teal-500
            focus:outline-teal-500 focus-within:border-teal-500
            hover:shadow-2xl"
        />
        <button
          className="rounded-md border-2 border-black
            w-12 h-12 hover:outline-teal-500 hover:border-teal-500
            focus:outline-teal-500 focus-within:border-teal-500
            flex justify-center items-center
            "
          onClick={handleOnAddItem}
        >
          {isFetchingData ? (
            <Spinner length={4} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
    </div>
  );
};
