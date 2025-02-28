export async function AuthServer(email, password, login) {
  const user = {
    email,
    password,
  };
  try {
    const response = await fetch(
      `http://192.168.0.253:5000/${login ? "login" : "register"}`,
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
    console.log("Error: ", err.status);
  }
}
