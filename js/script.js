//index.html用
//顧客追加
    function saveCustomer(){

        const customer = {

            name:
                document.getElementById("name").value,

            person:
                document.getElementById("person").value,

            tel:
                document.getElementById("tel").value
        };

        // 配列取得
            const customers =
                JSON.parse(localStorage.getItem("customers"))
                || [];

        // 追加
            customers.push(customer);

        // 保存
            localStorage.setItem(
                "customers",
                JSON.stringify(customers)
            );

        
            alert("登録完了");
    }

// 文書種類変更時
window.onload = function () {

    console.log("script開始");

    // テンプレート読み込み
    const documentType =
        document.getElementById("documentType");

    const createButton =
        document.getElementById("createButton");

        //文書種類変更
        documentType.addEventListener("change", function () {

        //選択値
        const selectedType = this.value;

        const templateText = templates[selectedType];
        
        //textAreaに反映
        document.getElementById("documentContent").value =
            templateText;
    });

    //文書生成
    createButton.addEventListener("click", function () {
        
    //alert("クリック成功");


        //入力値取得
        const issueDate =
            document.getElementById("issueDate").value;

        const customerName =
            document.getElementById("customerName").value;

        const documentContent =
            document.getElementById("documentContent").value;
        
        const inputText =
            document.getElementById("inputText").value;

        //自社情報取得
        const companyInfo =
            document.getElementById("companyInfo").innerHTML;

        //文書
        const formattedContent =
            documentContent.replace(/\n/g, "<br>");//改行を<br>に変換

        const formattedInputText =
            inputText.replace(/\n/g, "<br>");//改行を<br>に変換
        
        //タイトルと本文分割
        const lines =
            formattedContent.split("<br>");

        const title =
            lines[0];

        const body =
            lines.slice(1).join("<br>");
    
        //備考欄
        let remarksSection = "";

        if (inputText.trim() !== "") {

            remarksSection = `
                <div class="remarks">
                    備考：<br>
                    ${formattedInputText}
                </div>
            `;
        }

        // resultText生成    
        const resultText = `
            <div class="issueDate">
                発行日時 : ${issueDate}
            </div>

            <div class="companyInfo">
                <div class="company-block">
                    ${companyInfo}
                </div>
            </div>

            <div class="customerName">
                ${customerName} 御中
            </div>

            <div class="documentTitle">
                ${title}
            </div>

            <div class="documentBody">
                ${body}
            </div>

            ${remarksSection}
        `;

         // localStorageへ保存 
         localStorage.setItem( "resultText", resultText ); 
         
         // preview画面へ移動 
         location.href = "preview.html"; 
    }); 
};