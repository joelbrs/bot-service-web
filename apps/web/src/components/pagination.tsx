import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@repo/ui/components";
import { RequestPagination } from "../models";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Props = {
  pagination: RequestPagination;
  onPaginate: (page: number) => void;
};

export const PaginationComponent = ({ pagination, onPaginate }: Props) => {
  const DEFAULT_PAGE = 1;

  const isFirstPage = () => pagination?.page === 0;
  const isLastPage = () => pagination?.page === pagination?.totalPages - 1;
  const hasPreviousPage = () => !isFirstPage();
  const hasNextPage = () => !isLastPage();

  return (
    <Pagination>
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-muted-foreground">
          Total de {pagination?.totalElements} item(s)
        </div>
        <div className="text-sm font-medium mt-1 mr-2">
          Página {pagination?.page + 1} de{" "}
          {pagination?.totalPages || DEFAULT_PAGE}
        </div>
      </div>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={isFirstPage()} onClick={() => onPaginate(0)} variant="ghost" size="sm">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasPreviousPage()} onClick={() => onPaginate(pagination.page - 1)} variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasNextPage()} onClick={() => onPaginate(pagination.page + 1)} variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={isLastPage()} onClick={() => onPaginate(pagination.totalPages - 1)} variant="ghost" size="sm">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
