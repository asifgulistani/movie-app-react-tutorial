import React from 'react';

const Pagination = props => {
    const {
        itemCount, 
        pageSize, 
        currentPage, 
        onPageChange,
        onPageSizeChange,
        currentPageItemCount
    } = props;

    const pageCount = Math.ceil(itemCount / pageSize);

    const pages = [ ...Array(pageCount).keys() ].map(i => i + 1);

    //[1,2,3,4].map
    return ( 
        <div className="d-flex justify-content-between d-flex align-items-center">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {pages.map(page =>
                        <li key={page} className={currentPage === page ? 'page-item active' : 'page-item'}>
                            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                        </li>
                    )}
                </ul>
            </nav>
            <span>{currentPageItemCount} records of Total {itemCount}.</span>
            <div className="form-inline">
                <div className="float-left">
                    Show Records 
                    <select className="form-control" defaultValue={pageSize} onChange={e => onPageSizeChange(parseInt(e.target.value))}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>
     );
}
 
export default Pagination;