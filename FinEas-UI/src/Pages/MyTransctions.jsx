
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';
// import Swal from 'sweetalert2';

// const MyTransactions = () => {
//   const { user } = useContext(AuthContext);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTransactions = async () => {
//     if (!user?.email) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`
//       );
//       setTransactions(res.data);
//     } catch {
//       toast.error('Failed to fetch transactions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [user]);

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you really want to delete this transaction?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
//       );
//       toast.success('Transaction deleted');
//       fetchTransactions();
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6">
//       <Toaster />
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
//         My Transactions
//       </h2>

//       {transactions.length === 0 && (
//         <p className="text-gray-600 dark:text-gray-300">
//           No transactions found
//         </p>
//       )}

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {transactions.map((item) => (
//           <div
//             key={item._id}
//             className="p-5 rounded-2xl border shadow-sm bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                   item.type === 'income'
//                     ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
//                     : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
//                 }`}
//               >
//                 {item.type}
//               </span>
//               <span className="text-gray-500 dark:text-gray-400 text-sm">
//                 {new Date(item.date).toLocaleDateString()}
//               </span>
//             </div>
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
//               {item.category}
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">
//               {item.description}
//             </p>
//             <div className="mt-3 font-bold text-gray-800 dark:text-gray-100 text-lg">
//               $ {item.amount}
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <NavLink
//                 to={`/update-transaction/${item._id}`}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
//               >
//                 Update
//               </NavLink>
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base"
//               >
//                 Delete
//               </button>
//               <NavLink
//                 to={`/transaction-details/${item._id}`}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base"
//               >
//                 View
//               </NavLink>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyTransactions;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import Loading from './Loding';

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    } catch {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
      );
      toast.success('Transaction deleted');
      fetchTransactions();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading)
    return (
     <Loading/>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <Toaster />
      <h2 className="text-2xl sm:text-3xl font-bold mb-6dark:text-slate-100 mb-2">
        My Transactions
      </h2>

      {transactions.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No transactions found
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {transactions.map((item) => (
          <div
            key={item._id}
            className="p-5 rounded-2xl 
              bg-gradient-to-br from-blue-50 via-white to-indigo-50
              dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
              shadow-xl border border-slate-200 dark:border-slate-700
              hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.type === 'income'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {item.type}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">
              {item.category}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {item.description}
            </p>
            <div className="mt-3 font-bold text-slate-800 dark:text-slate-100 text-lg">
              $ {item.amount}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <NavLink
                to={`/update-transaction/${item._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Update
              </NavLink>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Delete
              </button>
              <NavLink
                to={`/transaction-details/${item._id}`}
                className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base"
              >
                View
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransactions;
