import AuthForm from './AuthForm';

function Login() {
    return (
    <div className="app">
      <div className="header">
        <h1>MoodJournal</h1>
        <h5>by Owen Goodman</h5>
      </div>
      <AuthForm />
    </div>
    )
}

export default Login;