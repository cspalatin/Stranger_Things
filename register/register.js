const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

$("#register-form").on("submit", async (e) => {
  e.preventDefault();
  const username = $("#exampleInputUsername").val();
  const password = $("#exampleInputPassword").val();
  // console.log(username, password);

  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    const { data } = await response.json();
    console.log(data.token);
    localStorage.setItem("auth-token", JSON.stringify(data.token));
    location.href = "/index.html";
  } catch (err) {
    console.error(err);
  }
});
