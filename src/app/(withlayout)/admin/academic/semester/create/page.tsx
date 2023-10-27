"use client";
import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormSelectField from "@/components/Form/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { academicSemesterTitleOptions, monthOptions } from "@/constants/global";
import { useAddAcademicSemesterMutation } from "@/redux/api/academicSemesterApi";
import { academicSemesterSchema } from "@/schemas/academicSemester";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { role } = getUserInfo() as any;
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    message.loading("Creating Academic Semester");
    console.log({ data });
    try {
      // const res = await userLogin({ ...data }).unwrap();
      data.year = Number(data.year);
      await addAcademicSemester(data);
      message.success("Academic semester added successfully");
      router.push("/admin/academic/semester");
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
    }
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
            label: `Manage Academic Semesters`,
            link: `/${role}/academic/semester`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <ActionBar title="Create Academic Semester"></ActionBar>
      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(academicSemesterSchema)}
        >
          <div
            style={{
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col
                className="gutter-row"
                span={8}
                style={{ margin: "10px 0px" }}
              >
                <FormSelectField
                  name="title"
                  label="Title"
                  size="large"
                  options={academicSemesterTitleOptions || []}
                  placeholder="Select"
                />
              </Col>
            </Row>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col
                className="gutter-row"
                span={8}
                style={{ margin: "10px 0px" }}
              >
                <FormSelectField
                  name="startMonth"
                  label="Start Month"
                  size="large"
                  options={monthOptions || []}
                  placeholder="Select"
                />
              </Col>
            </Row>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col
                className="gutter-row"
                span={8}
                style={{ margin: "10px 0px" }}
              >
                <FormSelectField
                  name="endMonth"
                  label="End Month"
                  size="large"
                  options={monthOptions || []}
                  placeholder="Select"
                />
              </Col>
            </Row>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col
                className="gutter-row"
                span={8}
                style={{ margin: "10px 0px" }}
              >
                <FormDatePicker
                  picker="year"
                  name="year"
                  label="Year"
                  size="large"
                />
              </Col>
            </Row>
          </div>

          <Button size="large" type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
