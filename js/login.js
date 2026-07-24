document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        // ページ遷移を止める
        event.preventDefault();

        const userId =
            document.getElementById("userId").value;
        const password =
            document.getElementById("password").value;

            if (userId === "shio" && password === "222") {
                // ログイン成功
                location.href = "main.html";
            } else {
                alert("ユーザーIDまたはパスワードが違います");
            }

    });