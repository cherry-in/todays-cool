import LoginForm from '../components/Form/LoginForm';

function LoginPage() {
  return (
    <>
      <div className="py-5">
        <h1>오늘의 KU</h1>
        <p className="ms-4">-일정관리앱</p>
      </div>
      <LoginForm />
    </>
  );
}

export default LoginPage;