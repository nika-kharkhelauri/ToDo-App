const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get access to the form's email and password:
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let userData = {
    email,
    password,
  };

  postData(userData);
});

// send request:
async function postData(obj) {
  try {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error("There was a problem retrieving information");
    } else {
      let data = await response.json();
      console.log(data);
      window.location.href = "myDay.html";
    }
  } catch (error) {
    alert("Sorry,something wrong!");
  }
}

// Google Sign-In

// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id:
//       "153398899841-6h63bfks31m3cg1o4qmvr4q35ql2orts.apps.googleusercontent.com",
//     callback: handleCredentialResponse,
//   });
//   google.accounts.id.renderButton(
//     document.getElementById("google-sign-in-button"),
//     { theme: "outline", size: "large" },
//   );
//   google.accounts.id.prompt();
// };

// function handleCredentialResponse(response) {
//   const token = response.credential;
//   console.log("Google Sign-In Token:", token);
//   postData({ token });
// }
