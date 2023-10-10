"use client";

import Contents from "@/components/ui/Contents";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import { isLoggedIn } from "../../services/auth.service";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isUserLoggedIn = isLoggedIn();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router]);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
