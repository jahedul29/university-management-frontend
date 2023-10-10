"use client";

import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const ManageFaculty = () => {
  const { role } = getUserInfo() as any;

  return (
    <div>
      <CustomBreadcrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `Manage Faculty`,
            link: "",
          },
        ]}
      />
      <h1>This is manage faculty page</h1>
      <Link href={"/super_admin/manage-faculty/create"}>
        <Button type="primary">Create</Button>
      </Link>
    </div>
  );
};

export default ManageFaculty;
