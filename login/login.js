const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

const addFormSubmitHandler = () => {
  $("#login-form").on("submit", async (e) => {
    try {
      e.preventDefault();
      // add a submit handler to our form
      const username = $("#exampleInputUsername").val(); // get username input
      const password = $("#exampleInputPassword").val(); // get password input

      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST", // the second object specifies the method type, "POST"
        headers: {
          // add the Content Type header to let the server know that the body we are sending is JSON
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
        // body needs to be JSON stringified
      });
      const data = await response.json(); // destructure the response to receive the token
      localStorage.setItem("auth-token", data.data.token); // set the token in localStorage
    } catch (error) {
      console.error(error);

      $(".error-message").text("🤚 Invalid Username or Password");
      setTimeout(() => {
        $(".error-message").text("");
        $("#exampleInputUsername").val("");
        $("#exampleInputPassword").val("");
      }, 2000);
    }
  });
};
$("#logout-btn").on("click", async (e) => {
  e.preventDefault();
  localStorage.clear();
  // await loadPage();
});

const addListeners = () => {
  // checkForLogin();
  addFormSubmitHandler();
};

addListeners();
