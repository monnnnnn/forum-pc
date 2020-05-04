function toLogin() {
    var userId = document.getElementById("userId").value;
    var password = document.getElementById("password").value;
    if (password != "" && userId != "") {
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/user/login",
            //url: 'http://localhost:9000/user/login',
            dataType: 'json',
            data: {
                userId: userId,
                password: password
            },
            success: function (result) {
                if(result.code == 400){
                    alert(result.message);
                }
                else if(result.data.userRole == 0) {
                    sessionStorage.setItem("userId",result.data.userId);                    
                    location.href ="user/home.html";
                }
                else if(result.data.userRole == 1) {
                    sessionStorage.setItem("userId",result.data.userId);
                    location.href ="admin/userList.html";
                }
                                                                         
            }
        });
    }
    else
        alert("账号或密码不能为空！");
}

//回车事件
document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) { //回车键的键值为13
        $("#submit").click(); //调用登录按钮的登录事件
    }
};