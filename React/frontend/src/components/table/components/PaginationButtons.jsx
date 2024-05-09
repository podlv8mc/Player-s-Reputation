import React from 'react';
import Images from '@/image/image';

const PreviousPageButton = ({onClick, disabled}) => (
    <button className={`pagination__btn ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
        <img src={Images.arrow} alt="arrow"/>
    </button>
);

const NextPageButton = ({onClick, disabled}) => (
    <button className={`pagination__btn ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
        <img src={Images.arrow} alt="arrow"/>
    </button>
);

const PaginationButtons = ({pageIndex, pageCount, previousPage, nextPage, gotoPage, setNullifaer, canPreviousPage, canNextPage}) => (
    <div className="pagination__wrap">
        <div className="pagination__box">
            <PreviousPageButton onClick={previousPage} disabled={!canPreviousPage}/>
            {Array.from({length: pageCount}, (_, i) => (
                <button
                    key={i}
                    onClick={() => {
                        gotoPage(i)
                        setNullifaer(i)
                    }}
                    className={`pagination__btn-op ${pageIndex === i ? 'active' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
            <NextPageButton onClick={nextPage} disabled={!canNextPage}/>
        </div>
    </div>
);

export default PaginationButtons;
