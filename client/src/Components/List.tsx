import { FC } from "react";

interface NamedChildren {
  title: React.ReactNode;
  items: React.ReactNode;
  paginationManager?: React.ReactNode;
  AddItem: React.ReactNode;
}

interface Props {
  totalPages: number;
  children: NamedChildren;
}

export const List: FC<Props> = ({ children, totalPages }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col justify-start items-center w-7/12 h-full
        mx-auto space-y-6"
      >
        <div className="text-2xl mt-6">{children.title}</div>
        {children.items}
        {children.paginationManager}
      </div>
      {children.AddItem}
    </div>
  );
};
