
import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import DeleteConfirmationModal from "../component/DeleteConfirmationModal"; 

export default function List() {
  const [cookies] = useCookies(['authToken']); 
  const [data, setData] = useState([]); 
  const [totalPages, setTotalPages] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [deleteUserId, setDeleteUserId] = useState(null); 
  const [openModal, setOpenModal] = useState(false); 
  const [userNameToDelete, setUserNameToDelete] = useState(""); 
  const [loading , setLoading]=useState(false)

  const columns = [
    {
      title: "#",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneno",
      key: "phoneno",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      render: (item) => (
        <div className="flex gap-1 text-center justify-center">
          <Link to="#" onClick={() => openDeleteModal(item.id, item.name)}>
            <Trash2 color="#ff0000" size={16} />
          </Link>
        </div>
      ),
      key: "action",
      width: 90,
    },
  ];

  const fetchUserData = async () => {
    const token = cookies.authToken; 
    if (token) {
      try {
        const response = await axios.get('https://reactinterviewtask.codetentaclestechnologies.tech/api/api/user-list', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            page: currentPage, 
            perPage: rowsPerPage, 
          },
        });

        const formattedData = response.data.data.map((user, index) => ({
          srno: index + 1 + (currentPage - 1) * rowsPerPage, 
          name: user.name,
          email: user.email,
          phoneno: user.phoneNumber,
          gender: user.gender,
          id: user.id, 
        }));

        setData(formattedData);
        setTotalPages(Math.ceil(response.data.total / rowsPerPage));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const openDeleteModal = (userId, userName) => {
    setDeleteUserId(userId);
    setUserNameToDelete(userName);
    setOpenModal(true); 
  };

  const handleDelete = async () => {
    const token = cookies.authToken;
    setLoading(true)
    if (token && deleteUserId) {
      try {
        const response = await axios.post(`https://reactinterviewtask.codetentaclestechnologies.tech/api/api/user-delete/${deleteUserId}`, {
          token: token,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.status === 200) {
          setData(prevData => prevData.filter(user => user.id !== deleteUserId));
          toast.success("User deleted successfully!");
          setLoading(false)
        } else {
            setLoading(false)
          toast.error("Failed to delete user.");
        }
      } catch (error) {
        setLoading(false)
        console.error("Error deleting user:", error);
        toast.error( error?.response?.data?.message || "An error occurred while deleting the user.");
      }
      setOpenModal(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page); 
    fetchUserData();
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value); 
    setCurrentPage(1); 
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, [cookies.authToken,]);
  
  return (
    <Layout>
      <ToastContainer />
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <div>
          <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">List</h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex justify-end mb-3 p-2">
            <Link to="/Stepperform" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Add</Link>
          </div>
          <Table 
            cols={columns} 
            data={data} 
            totalPages={totalPages} 
            page={currentPage} 
            handlePageChange={handlePageChange}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange} 
            isTableLoading={!data.length} 

          />
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)} 
        onConfirm={handleDelete} 
        userName={userNameToDelete} 
        loading={loading}
      />
    </Layout>
  );
}
