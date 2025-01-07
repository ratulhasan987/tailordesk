// src/components/CustomTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (searchTerm, pageNumber) => {
    try {
      const response = await axios.get(`api`, {
        params: {
          paginate: 5,
          search: searchTerm,
          page: pageNumber,
        },
      });
      console.log(response.data);
      setData(response.data.data);
      setPage(response.data.current_page);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(search, page);
  }, [page]);

  useEffect(() => {
    setPage(1); // Reset to page 1 on new search
  }, [search]);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Custom Table</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search area"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-600 p-2 w-full rounded-lg bg-gray-800 text-white placeholder-gray-400"
        />
      </div>
      <table className="table-auto border-collapse border border-gray-600 w-full text-center">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">ID</th>
            <th className="border border-gray-600 px-4 py-2">Name</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
            <th className="border border-gray-600 px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(item => (
              <tr
                key={item.id}
                className="bg-gray-800 border-t border-gray-700 hover:bg-gray-700"
              >
                <td className="border border-gray-600 px-4 py-2">{item.id}</td>
                <td className="border border-gray-600 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-600 px-4 py-2">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
