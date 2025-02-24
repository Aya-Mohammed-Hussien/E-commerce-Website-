import React from 'react'

export default function CustomPagination({ currentPage, totalPages, handlePageChange }) {
    
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
    {/* Previous Button */}
    <button
      onClick={() => handlePageChange({ selected: currentPage -2})}
      disabled={currentPage === 1}
      className={`${
        currentPage === 1
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-md hover:shadow-lg' // Active state
      } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
    >
      Previous
    </button>

    <span className="text-lg text-gray-700 dark:text-gray-400">
      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
    </span>

    {/* Next Button */}
    <button
      onClick={() => handlePageChange( { selected: currentPage })}
      disabled={currentPage === totalPages}
      className={`${
        currentPage === totalPages
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-md hover:shadow-lg' // Active state
      } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
    >
      Next
    </button>
  </div>
  )
}
