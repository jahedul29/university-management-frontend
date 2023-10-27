"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/Login-amico.svg";
import { storeUserInfo } from "../../services/auth.service";

type FormValues = {
  id: string;
  password: string;
};

const Login = () => {
  const [userLogin, options] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        message.success("User logged in successfully");
        router.push("/profile");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={10} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "16px 0px",
          }}
        >
          Login to your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="id" type="text" size="large" label="User ID" />
            </div>
            <div
              style={{
                margin: "16px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
