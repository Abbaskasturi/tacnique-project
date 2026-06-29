import './Pagination.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalItems, pageSize, setCurrentPage }) {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="pagination">
            <div className="page-controls">
                <span>
                    Page {currentPage} of {totalPages || 1}
                </span>
                <button 
                    onClick={handlePrevious} 
                    disabled={currentPage === 1}
                    className="icon-btn"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="icon-btn"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
