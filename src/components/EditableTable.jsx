import React from "react";
import Button from "./Button";
import { Table } from "antd";
import useSwr from "swr";
import DotLoader from "./DotLoader";
import Error from "./Error";
import axiosInstance from "../services/axiosService";
import userData from "../services/userData";
import { toast } from "react-hot-toast";

const fetcher = async (...args) => {
  const res = await axiosInstance.get(...args);
  return res.data;
};

export default function EditableTable({ displayFormModal, editUser }) {
  const { data, isLoading, error, mutate } = useSwr("/users", fetcher);

  const deleteUser = async (id) => {
    const { removeUser } = userData;
    try {
      await removeUser(id);
      mutate();
      toast.success("Deleted user ", { duration: 2000 });
    } catch (err) {
      toast.error("Error occured " + error.message, { duration: 2000 });
      console.log(err);
    }
  };

  if (isLoading) return <DotLoader />;
  if (error) return <Error error={error} />;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      filters: [
        {
          text: "HR",
          value: "hr",
        },
        {
          text: "Developer",
          value: "dev",
        },
        {
          text: "Manager",
          value: "manager",
        },
      ],

      onFilter: (value, record) => record.designation === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record, value) => {
        return (
          <div>
            <Button
              varaint={"primary"}
              clickHandler={() => {
                editUser(record);
                displayFormModal();
              }}
            >
              Edit
            </Button>
            <Button
              clickHandler={() => deleteUser(record.id)}
              varaint={"danger"}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        title={() => (
          <div className='flex justify-center font-bold text-3xl '>
            User data
          </div>
        )}
        className='w-full'
        columns={columns}
        bordered
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
      />
      <div className='flex w-full justify-end'>
        <Button
          clickHandler={() => {
            editUser(null);
            displayFormModal();
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
}
