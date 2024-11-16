
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Product() {
  const [data, setData] = useState([]);
  const [cookies] = useCookies(["authToken"]); 
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  
  const columns = [
    { title: "#", dataIndex: "srno", key: "srno" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => (
        <div className="m-auto flex justify-center">
          <img
            src={imageUrl.image || "/assets/image/shirt.webp"}
            alt="productimg"
            width="50px"
            height="50px"
            className="rounded"
          />
        </div>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const fetchProducts = async () => {
    try {
      const token = cookies.authToken;
      if (!token) {
        console.error("Token not found in cookies!");
        return;
      }
  
      const response = await axios.get(
        `https://reactinterviewtask.codetentaclestechnologies.tech/api/api/product-list?page=${page}&perPage=${rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const { data: products, lastPage } = response.data;
  
      const formattedData = products.map((product, index) => ({
        srno: (page - 1) * rowsPerPage + index + 1,
        name: product.name,
        image: product.image,
        description: product.description,
        price: `Rs.${product.price}/-`,
      }));
  
      setData(formattedData);
      setTotalPages(lastPage);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setPage(1);
    fetchProducts(); 
  };
  

  useEffect(() => {
    fetchProducts();
  }, [cookies, page, rowsPerPage]);
  
  
  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
          Product
        </h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Add-product"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add Product
            </Link>
          </div>
          <Table
            cols={columns}
            data={data}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            isTableLoading={!data.length} 
            />

        </div>
      </div>
    </Layout>
  );
}
