import './App.css';

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <header className="User-header">
        <h1>Welcome to the User Info {props.match.params.username}</h1>
      </header>
    </div>
  );
}

export default UserInfo;