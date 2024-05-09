import React from 'react';
import Images from '@/image/image';
import ReactPaginate from 'react-paginate';

const PaginationButtons = ({ pageIndex, pageCount, gotoPage, setNullifaer }) => (
    <ReactPaginate
        pageCount={pageCount}
        onPageChange={({ selected }) => {
            gotoPage(selected);
            setNullifaer(selected);
        }}
        pageRangeDisplayed={2} // Количество отображаемых страниц
        marginPagesDisplayed={1} // Количество видимых страниц в начале и в конце
        previousLabel={<img src={Images.arrow} alt="arrow" />} // Заменяет текст на изображение
        nextLabel={<img src={Images.arrow} alt="arrow" />} // Заменяет текст на изображение
        breakLabel={'...'} // Заменяет многоточие
        containerClassName={'pagination__wrap'}
        activeClassName={'active'}
        pageClassName={'pagination__btn-op'}
        previousClassName={`pagination__btn ${!pageIndex ? 'disabled' : ''}`}
        nextClassName={`pagination__btn ${pageIndex === pageCount - 1 ? 'disabled' : ''}`}
    />
);

export default PaginationButtons;
