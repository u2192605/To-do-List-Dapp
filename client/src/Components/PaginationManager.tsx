import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";

enum PageIncrement {
  FORWARD = 1,
  BACKWARD = -1,
}

interface Props {
  page: number;
  totalPages: number;
  changePage: Function;
}

export const PaginationManager: FC<Props> = ({
  page,
  totalPages,
  changePage,
}) => {
  const handleChangePage = (increment: PageIncrement) => {
    changePage(page + increment);
  };
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleChangePage(PageIncrement.BACKWARD)}
        disabled={page === 0}
        className="hover:text-teal-500  hover:scale-150 disabled:text-gray-500 disabled:scale-100"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div>
        {page + 1}/{totalPages}
      </div>
      <button
        onClick={() => handleChangePage(PageIncrement.FORWARD)}
        className="hover:text-teal-500  hover:scale-150 disabled:text-gray-500 disabled:scale-100"
        disabled={totalPages === page + 1}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
