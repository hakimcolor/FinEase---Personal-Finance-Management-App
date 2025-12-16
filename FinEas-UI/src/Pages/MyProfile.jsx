
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loading from './Loding';

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || user?.firstName || '');
  const [photo, setPhoto] = useState(user?.photoURL || user?.imgUrl || '');
  const [loading, setLoading] = useState(false);

  if (!user) return <Loading />;

  // 🔹 Save with SweetAlert2
  const handleUpdateConfirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Update',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate();
      }
    });
  };

  // 🔹 Update API call

  const handleUpdate = async () => {
    try {
      setLoading(true);
      console.log(user._id); // check id

      const res = await axios.put(
        `http://localhost:3000/users/${user._id}`, // use _id instead of email
        {
        name,
         photo,
        }
      );

      // update user context
      setUser(res.data.user);

      setIsEditing(false);

      // ✅ Success Alert
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Your profile has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('myprofile');
      });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Profile update failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md sm:max-w-lg p-6 rounded-2xl
        bg-gradient-to-br from-blue-50 via-white to-indigo-50
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        shadow-xl border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">
          My Profile
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          {photo ? (
            <img
              src={photo}
              alt="profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-indigo-500"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-slate-300 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Name
            </label>
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-300"
              />
            ) : (
              <p className="text-slate-800 dark:text-slate-100">
                {user.displayName || user.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Email
            </label>
            <p className="text-slate-800 dark:text-slate-100">{user.email}</p>
          </div>

          {isEditing && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Photo URL
              </label>
              <input
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-300"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateConfirm}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-slate-300 hover:bg-slate-400 text-slate-800 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
