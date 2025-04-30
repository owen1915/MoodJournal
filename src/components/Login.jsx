import AuthForm from './AuthForm';

function Login() {
    return (
    <div className="app">
      <div className="header">
        <h1>MoodJournal</h1> {/* main app title */}
        <h5>by Owen Goodman</h5> {/* creator credit */}
      </div>
      <AuthForm /> {/* login/signup form */}
    </div>
    )
}

export default Login;
