"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import CustomTable from "@/components/ui/CustomTable";
import { useDebounced } from "@/hooks/common";
import {
  useAcademicFacultiesQuery,
  useDeleteAcademicFacultyMutation,
} from "@/redux/api/academicFacultyApi";
import { getUserInfo } from "@/services/auth.service";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const AcademicFaculty = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();

  const query: Record<string, any> = {
    limit,
    page,
    sortBy,
    sortOrder,
  };

  const debounceTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (debounceTerm) {
    query["searchTerm"] = debounceTerm;
  }

  const { data, isLoading } = useAcademicFacultiesQuery({ ...query });

  const handleDelete = async (id: string) => {
    message.loading("Deleting academic faculty..");
    try {
      await deleteAcademicFaculty(id);
      message.success("Academic faculty deleted successfully");
    } catch (error: any) {
      message.error(error.message);
      console.error(error.message);
    }
  };

  const { role } = getUserInfo() as any;
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      render: (data: any) => {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            {/* <Button onClick={() => console.log({ data })} type="primary">
              <EyeOutlined />
            </Button> */}
            <Link href={`/admin/academic/faculty/edit/${data?.id}`}>
              <Button type="primary" style={{ margin: "0px 10px" }}>
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => handleDelete(data.id)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(
      order === "descend" ? "desc" : order === "ascend" ? "asc" : ""
    );
  };

  const resetFilers = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <CustomBreadcrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `Manage Academic Faculty`,
            link: "",
          },
        ]}
      />
      <ActionBar title="Academic Faculty List">
        <>
          <Input
            style={{ width: "200px" }}
            type="search"
            placeholder="Search...."
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <Link href={"/admin/academic/faculty/create"}>
              <Button size="large" type="primary">
                Create
              </Button>
            </Link>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                onClick={resetFilers}
                size="large"
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </>
      </ActionBar>

      <div>
        <CustomTable
          loading={isLoading}
          dataSource={data?.academicFaculties}
          columns={columns}
          pageSize={limit}
          totalPage={data?.meta?.total || 1}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default AcademicFaculty;
