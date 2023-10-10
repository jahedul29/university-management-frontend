"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import { changePasswordSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row } from "antd";
import { SubmitHandler } from "react-hook-form";

const ChangePassword = () => {
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "80vh",
      }}
    >
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "16px 0px",
          }}
        >
          Reset Password
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(changePasswordSchema)}
          >
            <div>
              <FormInput
                name="oldPassword"
                type="password"
                size="large"
                label="Old Password"
              />
            </div>
            <div
              style={{
                margin: "16px 0px",
              }}
            >
              <FormInput
                name="newPassword"
                type="password"
                size="large"
                label="New Password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePassword;
