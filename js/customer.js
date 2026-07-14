console.log("customer.js 読み込み成功");

//データがあればデータ読込、ない場合、配列作成
//const　customersで顧客情報を入れておく
//localStorage.getItem("customers")でローカルストレージからデータを取得する
//JSON.parse()で文字列をオブジェクトに変換する
const customers =
    JSON.parse(localStorage.getItem("customers"))
    || [];

console.log(customers);
//顧客情報をテーブル形式で表示
console.table(customers);


const customerForm = 
    document.getElementById('customerForm');
const customerListArea =
    document.getElementById("customerListArea");    
    let editingIndex = null;

function displayCustomers() {

customerListArea.innerHTML = "";
    // 表示用にコピーを作成
    const sortedCustomers = 
    customers.map(function(customer, index) {
    return {
        originalIndex: index,
        customer: customer
    };
});
    sortedCustomers.sort(function(a, b) {
    return (a.customer.nameLast + a.customer.nameFirst)
        .localeCompare(
            b.customer.nameLast + b.customer.nameFirst,
            "ja"
        );
});

//顧客情報を表示
for (const item of sortedCustomers) {
        customerListArea.innerHTML +=
            "<p>" +
            item.customer.nameLast +
            " " +
            item.customer.nameFirst +
            "<button onclick=\"selectCustomer(" + item.originalIndex + ")\">選択</button>"+
            "<button onclick=\"editCustomer(" + item.originalIndex + ")\">編集</button>"+
            " <button onclick=\"deleteCustomer(" + item.originalIndex + ")\">削除</button>" +
            "</p>";

    }

}
//顧客情報選択
function selectCustomer(index) {

    const customer = customers[index];

    
    document.getElementById("customerName").value =
        customer.nameLast + " " + customer.nameFirst;
        //顧客情報が配列の何番目にいるかを指す
        editingIndex = index;
        console.log(editingIndex);

}
//顧客情報編集
function editCustomer(index) {

    const customer = customers[index];

    document.getElementById("nameLast").value =
        customer.nameLast;
    document.getElementById("nameFirst").value =
        customer.nameFirst;
    document.getElementById("postalCode").value =
        customer.postalCode;
    document.getElementById("address").value =
        customer.address;
    document.getElementById("phoneNumber").value =
        customer.phoneNumber;
    editingIndex = index;
    console.log(editingIndex);

}
//顧客情報削除
function deleteCustomer(index) {
    console.log("削除開始");
    console.log(index);
    //配列から削除
    customers.splice(index, 1);
    //ローカルストレージに保存
    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );
    //顧客情報表示
    displayCustomers();
    //削除完了メッセージ
    alert("削除しました");
}


customerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // 入力値取得
        //後日ラジオボタンから取得予定
        const clientType =""; 
        // document.getElementById("clientType").value;

        const nameLast =
        document.getElementById("nameLast").value;

        const nameFirst =
        document.getElementById("nameFirst").value;

        const postalCode =
            document.getElementById("postalCode").value.trim();

        const postalPattern =
            /^\d{3}-?\d{4}$/;
            if (!postalPattern.test(postalCode)) {
                alert("郵便番号は「1234567」または「123-4567」の形式で入力してください。");
                return;
            }

        const address =
            document.getElementById("address").value;    
        
        const phoneNumber =
            document.getElementById("phoneNumber").value.trim();
        const normalizedPhoneNumber = phoneNumber.replace(/-/g, "");
        const phonePattern = /^\d{10,11}$/;
            if (!phonePattern.test(normalizedPhoneNumber)) {
            alert("電話番号は10桁または11桁の半角数字で入力してください。");
            return;
        }

    console.log(editingIndex);

    //顧客情報をオブジェクトとしてまとめる
    //顧客情報の有無によって、編集モードか新規追加モードかを判定する
    if (editingIndex === null) {
        // 新規追加モード
        customers.push({
            clientType: clientType,
            nameLast: nameLast,
            nameFirst: nameFirst,
            postalCode: postalCode,
            address: address,
            phoneNumber: phoneNumber
        });
        
    } else {

        // 編集モード
        customers[editingIndex] = {
            clientType: clientType,
            nameLast: nameLast,
            nameFirst: nameFirst,
            postalCode: postalCode,
            address: address,
            phoneNumber: phoneNumber
        };
    }
    
    //ブラウザにデータ保管
    //JSON.stringify()でオブジェクトを文字列に変換してから保存する
    localStorage.setItem(
        "customers", JSON.stringify(customers)
    );

    //顧客情報表示
    displayCustomers();
    // console.log(
    // localStorage.getItem("customers")
    // );
   
    // console.log("保存完了");

    alert("登録完了");
    

});
//顧客情報表示
displayCustomers();