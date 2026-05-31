//preview.html用
// localStorageから取得
    const resultText =
        localStorage.getItem(
            "resultText");


// プレビュー表示
    document.getElementById(
        "previewArea")
        .innerHTML = resultText;



// 印刷ボタン
    const printButton =
        document.getElementById(
        "printButton"
        );

        printButton.addEventListener(
            "click", function () {
        window.print();
        });