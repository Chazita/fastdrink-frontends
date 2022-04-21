import {
	Pagination,
	PaginationContainer,
	PaginationNext,
	PaginationPage,
	PaginationPageGroup,
	PaginationPrevious,
	usePagination,
} from "@ajna/pagination";
import { useColorModeValue } from "@chakra-ui/react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

type PaginationProps = {
	pagesCount: number;
	page: number;
	handlePagination: (num: number) => void;
};

const Paginate = ({ pagesCount, page, handlePagination }: PaginationProps) => {
	const { pages, currentPage, setCurrentPage } = usePagination({
		pagesCount,
		initialState: { currentPage: page },
		limits: {
			inner: 1,
			outer: 2,
		},
	});

	const bg = useColorModeValue("blue.300", "blue.700");

	return (
		<Pagination
			currentPage={currentPage}
			pagesCount={pagesCount}
			onPageChange={setCurrentPage}
		>
			<PaginationContainer justifyContent={"center"} mt="2">
				<PaginationPrevious
					bg={bg}
					onClick={() => handlePagination(currentPage - 1)}
					mr={"1"}
				>
					<MdNavigateBefore />
				</PaginationPrevious>
				<PaginationPageGroup>
					{pages.map((page: number) => (
						<PaginationPage
							bg={bg}
							p={"5"}
							key={`pagination_page_${page}`}
							page={page}
							onClick={() => handlePagination(page)}
							_current={{ bg: "blue.500" }}
						/>
					))}
				</PaginationPageGroup>
				<PaginationNext
					onClick={() => handlePagination(currentPage + 1)}
					ml={"1"}
					bg={bg}
				>
					<MdNavigateNext />
				</PaginationNext>
			</PaginationContainer>
		</Pagination>
	);
};

export default Paginate;
