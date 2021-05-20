const isLoggedIn = () => {
  return localStorage.getItem("auth-token");
};

const isLoggedOut = () => {
  return localStorage.clear();
};

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

async function fetchPosts() {
  try {
    const token = localStorage.getItem("auth-token");
    const makeHeaders = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${makeHeaders}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteFunction(postId) {
  try {
    console.log(postId);
    const token = localStorage.getItem("auth-token");

    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(response);
  } catch (error) {}
}

async function sendMessage(postId, message) {
  const myToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: `${message}`,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function createPostHTML(post) {
  // console.log(post);
  let newPost = post.isAuthor
    ? $(`
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">Location: ${post.location}</p>
        <p class="card-text">Description: ${post.description}</p>
        <p class="card-text">Price: ${post.price}</p>
        <p class="card-text">Will Deliver: ${post.willDeliver}</p>
        <button id="delete" class="delete">Delete</button>
        <footer class="blockquote-footer">Post by: ${post.author.username}</footer>
      </div>
    </div>
    `).data("post", post)
    : $(`
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">Location: ${post.location}</p>
        <p class="card-text">Description: ${post.description}</p>
        <p class="card-text">Price: ${post.price}</p>
        <p class="card-text">Will Deliver: ${post.willDeliver}</p>
        <input type="text" name="message" class="message-text">
        <button class="message">Message</button>
        <footer class="blockquote-footer">Post by: ${post.author.username}</footer>
      </div>
    </div>
    `).data("post", post);

  return newPost;
}

async function renderPosts() {
  try {
    let posts = await fetchPosts();
    posts = posts.data.posts.reverse();
    posts.forEach((post) => {
      const postHTML = createPostHTML(post);
      $("#posts").append(postHTML);
    });
  } catch (error) {
    console.error(error);
  }
}

const postPost = async (requestBody) => {
  try {
    if (isLoggedIn) {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: requestBody,
        }),
      });
      const data = await response.json();
      location.href = "/index.html";
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};

$("form").on("submit", (e) => {
  e.preventDefault();
  const postTitle = $("#post-title").val();
  const postDescription = $("#post-description").val();
  // const postAuthor = $("#post-author").val();
  const postPrice = $("#post-price").val();
  const postLocation = $("#post-location").val();
  console.log(postTitle, postDescription);

  const requestBody = {
    title: postTitle,
    description: postDescription,
    price: postPrice,
    willDeliver: false,
    location: postLocation,
  };
  try {
    postPost(requestBody);
  } catch (e) {
    console.error(e);
  }
});

$("#posts").on("click", "#delete", function (e) {
  e.preventDefault();

  const postElement = $(this).closest(".card");
  const post = postElement.data("post");
  const id = post._id;
  deleteFunction(id);
  postElement.slideUp();
});

$("#posts").on("click", ".message", function (e) {
  e.preventDefault();

  const postElement = $(this).closest(".card");
  const post = postElement.data("post");
  const id = post._id;
  deleteFunction(id);
  postElement.slideUp();
});

renderPosts();
