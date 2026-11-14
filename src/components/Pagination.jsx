import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-nectar-darkBorder text-xs text-gray-500 dark:text-gray-400">
      <div>
        Showing page <span className="font-bold text-gray-900 dark:text-gray-100">{currentPage}</span> of{' '}
        <span className="font-bold text-gray-900 dark:text-gray-100">{totalPages}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-gray-200 dark:border-nectar-darkBorder bg-white dark:bg-nectar-darkCard disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-nectar-darkBg transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`
              w-7 h-7 rounded-lg text-xs font-semibold transition-colors
              ${pageNum === currentPage
                ? 'bg-nectar-forest text-white dark:bg-nectar-mint dark:text-nectar-forest font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-nectar-darkBg'}
            `}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-gray-200 dark:border-nectar-darkBorder bg-white dark:bg-nectar-darkCard disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-nectar-darkBg transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
