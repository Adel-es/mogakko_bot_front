import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
export default Home;
