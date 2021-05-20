const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

const postPost = async (requestBody) => {
  // request token from local storage
  const token = localStorage.getItem("auth-token");
  try {
    if (token) {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};

$("form").on("submit", (e) => {
  console.log("anything");
  e.preventDefault();
  const postTitle = $("#post-title").val();
  const postDescription = $("#post-description").val();
  const postAuthor = $("#post-author").val();
  console.log(postTitle, postDescription, postAuthor);

  const requestBody = {
    userId: 1,
    title: postTitle,
    description: postDescription,
    author: postAuthor,
  };
  try {
    postPost(requestBody);
  } catch (e) {
    console.error(e);
  }
});
