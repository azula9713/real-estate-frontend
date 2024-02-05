import { Pagination } from "flowbite-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showIcons?: boolean;
};

function Paginate({
  currentPage,
  totalPages,
  onPageChange,
  showIcons = true,
}: Readonly<Props>) {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons={showIcons}
      />
    </div>
  );
}

export default Paginate;
