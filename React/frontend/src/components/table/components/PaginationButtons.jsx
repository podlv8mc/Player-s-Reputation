import React from 'react';
import Images from '@/image/image';
import ReactPaginate from 'react-paginate';

const PaginationButtons = ({ pageIndex, pageCount, gotoPage }) => (
    <nav className="pagination__wrap">
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={({ selected }) => {
                gotoPage(selected);
            }}
            pageRangeDisplayed={2} // Количество отображаемых страниц
            marginPagesDisplayed={3} // Количество видимых страниц в начале и в конце
            previousLabel={<img src={Images.arrow} alt="arrow" />}
            nextLabel={<img src={Images.arrow} alt="arrow" />}
            breakLabel={'...'}
            containerClassName={'pagination__box'}
            activeClassName={'active'}
            pageClassName={'pagination__btn-op'}
            previousClassName={`pagination__btn ${!pageIndex ? 'disabled' : ''}`}
            nextClassName={`pagination__btn ${pageIndex === pageCount - 1 ? 'disabled' : ''}`}
        />
    </nav>
);

export default PaginationButtons;
