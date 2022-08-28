import React, {useMemo} from 'react'
// silme güncelleme ekleme vb -> mutation
// veri çekme işlemleri query
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductList, deleteProduct } from '../../../api';
import Main from "../index";
import { Table, Popconfirm } from "antd";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Action } from 'history';
import { Link } from "react-router-dom";

function Products() {

  const queryClient = useQueryClient();

  const {isLoading, isError, data, error} = useQuery(
    "admin:products", 
    fetchProductList);
    // ikinci parametre verilmeyebilir.
    // işlemden önce sonra VBArray. yapılması istenilen şeyler verilir
    const deleteMutation = useMutation(deleteProduct, {
      // key'in ait olduğu query baştan çalıştırılır
      onSuccess: () => queryClient.invalidateQueries("admin:products"),
      // refetchQueries: ["admin:products"],
    });

    const columns = useMemo(() => {
      return [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <>
              <Link to={`/admin/products/${record._id}`}>Edit</Link>
              <Popconfirm
                title="Emin misiniz?"
                onConfirm={() => {
                  // id ile ürün silindibaşarılı olursa onsuccess çalışır
                  deleteMutation.mutate(record._id,{
                    onSuccess: () => {
                      console.log("success");
                      // queryClient.invalidateQueries("admin:products");
                    }
                  });
                }}
                onCancel={() => {
                  console.log("iptal edildi");
                }}
                okText="Evet"
                cancelText="Hayır"
                placement='left'
              >
                <a href="/#" style={{marginLeft: 10}} >Delete</a>
              </Popconfirm>
            </>
          )
        }
      ]
    }, []);

    if(isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div>Error {error.message}</div>
    }

    console.log(data);

  return (
    <div>
      <Main/>
      
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Text fontSize={"2xl"} p="5">Products</Text>
        <Link to="/admin/products/new">
          <Button>New</Button>
        </Link>
      </Flex>
      

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  )
}

export default Products
