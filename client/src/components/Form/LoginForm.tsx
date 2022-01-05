import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Formik } from "formik";
import { useAuth } from "../../utils/context";
import * as Yup from "yup";
import catchErrors from "../../utils/catchErrors";
import styles from "./form.module.scss";

const LoginForm = () => {
  const { login } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (success) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Formik
        initialValues={{
          userId: "",
          password: "",
        }}
        validationSchema={Yup.object({
          userId: Yup.string().required("아이디를 입력해주세요."),
          password: Yup.string().required("비밀번호를 입력해주세요."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setError("");
            const result = await login(values);
            if (result) {
              setSuccess(true);
            }
          } catch (error) {
            catchErrors(error, setError);
            resetForm();
          }
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="m-5">
            <div className="mb-3">
              <input
                type="text"
                className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                placeholder="아이디"
                autoComplete="nope"
                {...formik.getFieldProps("userId")}
              />
              {formik.touched.userId && formik.errors.userId ? (
                <div className="text-danger mt-1" style={{ fontSize: "10px" }}>
                  {formik.errors.userId}
                </div>
              ) : null}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                placeholder="비밀번호"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger mt-1" style={{ fontSize: "10px" }}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="d-grid gap-2 mt-5">
              <button type="submit" className="btn btn-crimson">
                로그인
              </button>
              <Link className="btn btn-crimson" to="/signup">
                회원가입
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
