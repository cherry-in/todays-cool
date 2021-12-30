import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import authApi from "../../apis/auth.api";
import catchErrors from "../../utils/catchErrors";
import styles from "./form.module.scss";

const SignupForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (success) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="py-5">
        <h1 className="text-center">회원가입</h1>
      </div>
      <Formik
        initialValues={{
          userId: "",
          password: "",
          repassword: "",
          userName: "",
          userStudNum: "",
        }}
        validationSchema={Yup.object({
          userId: Yup.string()
            .required("아이디를 입력해주세요.")
            .max(15, "15자 이내로 입력해주세요.")
            .min(5, "최소 5자 이상 입력해주세요."),
          password: Yup.string()
            .required("비밀번호를 입력해주세요.")
            .min(8, "최소 8자 이상 입력해주세요."),
          repassword: Yup.string()
            .required("비밀번호를 입력해주세요.")
            .min(8, "최소 8자 이상 입력해주세요.")
            .oneOf(
              [Yup.ref("password"), null],
              "비밀번호가 일치하지 않습니다."
            ),
          userName: Yup.string().required("이름을 입력해주세요."),
          userStudNum: Yup.string()
            .required("학번을 입력해주세요.")
            .min(7, "학번을 정확히 입력해주세요."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setError("");
            const { userId, password, repassword, userName, userStudNum } =
              values;
            const result = await authApi.signup(userId, password, repassword, userName, userStudNum);
            if (result.status === 201) {
              alert("회원가입이 완료되었습니다.");
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
          <form onSubmit={formik.handleSubmit} className="mt-3">
            <div className="mb-3 d-flex flex-row">
              <label className="form-label" style={{ width: "100px" }}>
                아이디
              </label>
              <div className="flex-col">
                <input
                  type="text"
                  name="userId"
                  className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                  autoComplete="off"
                  {...formik.getFieldProps("userId")}
                />
                {formik.touched.userId && formik.errors.userId ? (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    {formik.errors.userId}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-3 d-flex flex-row">
              <label className="form-label" style={{ width: "100px" }}>
                비밀번호
              </label>
              <div className="flex-col">
                <input
                  type="password"
                  name="password"
                  className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-3 d-flex flex-row">
              <label
                className="form-label"
                style={{ width: "100px", wordBreak: "keep-all" }}
              >
                비밀번호 확인
              </label>
              <div className="flex-col">
                <input
                  type="password"
                  name="repassword"
                  className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                  {...formik.getFieldProps("repassword")}
                />
                {formik.touched.repassword && formik.errors.repassword ? (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    {formik.errors.repassword}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-3 d-flex flex-row">
              <label className="form-label" style={{ width: "100px" }}>
                이름
              </label>
              <div className="flex-col">
                <input
                  type="text"
                  name="userName"
                  className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                  autoComplete="off"
                  {...formik.getFieldProps("userName")}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-3 d-flex flex-row">
              <label className="form-label" style={{ width: "100px" }}>
                학번
              </label>
              <div className="flex-col">
                <input
                  type="text"
                  name="userStudNum"
                  className={`form-control shadow-none rounded-0 ${styles.textInput}`}
                  autoComplete="off"
                  {...formik.getFieldProps("userStudNum")}
                />
                {formik.touched.userStudNum && formik.errors.userStudNum ? (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    {formik.errors.userStudNum}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="d-grid gap-2 ">
              <button type="submit" className="btn btn-crimson mt-5">
                확인
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
