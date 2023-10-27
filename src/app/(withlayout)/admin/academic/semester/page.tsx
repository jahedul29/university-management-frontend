"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import CustomTable from "@/components/ui/CustomTable";
import { useDebounced } from "@/hooks/common";
import {
  useAcademicSemestersQuery,
  useDeleteAcademicSemesterMutation,
} from "@/redux/api/academicSemesterApi";

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

const AcademicSemester = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

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

  const { data, isLoading } = useAcademicSemestersQuery({ ...query });

  const handleDelete = async (id: string) => {
    message.loading("Deleting academic semester..");
    try {
      const res: any = await deleteAcademicSemester(id);
      if (res?.data) {
        message.success("Semester deleted successfully!");
      } else {
        message.error(res?.error?.data);
      }
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
      title: "Code",
      dataIndex: "code",
      sorter: true,
    },
    {
      title: "Start month",
      dataIndex: "startMonth",
      sorter: true,
    },
    {
      title: "End month",
      dataIndex: "endMonth",
      sorter: true,
    },
    {
      title: "Year",
      dataIndex: "year",
      sorter: true,
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
            <Link href={`/admin/academic/semester/edit/${data?.id}`}>
              <Button type="primary" style={{ margin: "0px 10px" }}>
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => handleDelete(data?.id)}
              type="primary"
              danger
            >
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
            label: `Manage Academic Semester`,
            link: "",
          },
        ]}
      />
      <ActionBar title="Academic Semester List">
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
            <Link href={"/admin/academic/semester/create"}>
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
          dataSource={data?.academicSemesters}
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

export default AcademicSemester;
