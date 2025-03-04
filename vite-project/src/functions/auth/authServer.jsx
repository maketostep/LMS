export async function AuthServer(email, password, type) {
  const user = {
    email,
    password,
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_SERVER_HTTPS}/auth/${
        type ? "login" : "register"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      }
    );
    return [response.status, await response.json()];
  } catch (err) {
    console.log("Error: ", err.message);
  }
}
