import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteConfirmationModal = ({ open, onClose, onConfirm, userName ,loading}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{userName}</strong>?</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-2 ${
                loading ? "cursor-not-allowed" : ""
            }`}
            >
            {loading ? (
                <span className="flex items-center">
                <CircularProgress size={20} className="text-white mr-2" />
                </span>
            ) : (
                <span>Delete</span>
            )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
