"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import CustomTable from "@/components/ui/CustomTable";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { getUserInfo } from "@/services/auth.service";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";

const Department = () => {
  // const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // query["size"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const query: Record<string, any> = {
    size,
    page,
    sortBy,
    sortOrder,
    searchTerm,
  };

  const { data, isLoading } = useDepartmentsQuery({ ...query });

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
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button onClick={() => console.log({ data })} type="primary">
              <EyeOutlined />
            </Button>
            <Button
              onClick={() => console.log({ data })}
              type="primary"
              style={{ margin: "0px 10px" }}
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => console.log({ data })} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    console.log({ order, field });
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
            label: `Manage Department`,
            link: "",
          },
        ]}
      />
      <ActionBar title="Department List">
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
            <Link href={"/super_admin/department/create"}>
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
          dataSource={data?.departments}
          columns={columns}
          pageSize={size}
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

export default Department;
