import AuthForm from './AuthForm';
import Info from './Info';

function Login() {
    return (
    <div className="app">
      <div className="header">
        <h1>MoodJournal</h1>
        <h5>by Owen Goodman</h5>
      </div>
      <div className="component-box">
        {<Info header="About MoodJournal" para="MoodJournal is a personal and intuitive web app designed to 
        help you track your daily emotions. Whether you're feeling great, struggling, or just somewhere in 
        between, MoodJournal provides a simple way to log your mood and reflect on your emotional journey over time."/>}

        {<Info header="Why use MoodJournal" para="Taking just a moment each day to check in with yourself can 
        make a huge difference. MoodJournal helps you build emotional awareness, identify patterns, and gain 
        insights into what affects your mental well-being. It’s a safe, private space to express how you feel—no pressure, just clarity."/>}

        {<Info header="About the Creator" para="Hey, I’m Owen Goodman. I created MoodJournal as a personal project 
        to combine my interest in mental health and web development. I’m currently a student passionate about building 
        simple, helpful tools that make a positive impact. Thanks for checking out my work!"/>}
      </div>
      <AuthForm />
    </div>
    )
}

export default Login;