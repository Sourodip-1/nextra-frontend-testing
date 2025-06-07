export default function Login() {
  function handleLogin(e) {
    e.preventDefault();
    const pass = e.target.password.value;
    if (pass === "admin123") {
      document.cookie = "admin-auth=admin123; path=/";
      window.location.href = "/dashboard";
    } else {
      alert("Wrong password");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="password" name="password" placeholder="Enter password" />
      <button type="submit">Login</button>
    </form>
  );
}
