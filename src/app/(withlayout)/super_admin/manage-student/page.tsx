"use client";

import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const ManageStudent = () => {
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
            label: `Manage student`,
            link: "",
          },
        ]}
      />
      <h1>This is manage student page</h1>
      <Link href={"/super_admin/manage-student/create"}>
        <Button type="primary">Create Student</Button>
      </Link>
    </div>
  );
};

export default ManageStudent;
