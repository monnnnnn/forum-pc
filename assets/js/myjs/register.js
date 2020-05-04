//判断密码是否相同
function toPass() {
    var password = document.getElementById("password").value;
    var password1 = document.getElementById("password1").value;
    if(password != password1){
        document.getElementById("tishi3").innerHTML="两次密码不相同！";
        document.getElementById("reginster").setAttribute("disabled", true);
        document.getElementById("reginster").style.backgroundColor  = '#555555';
    }
    else{
        document.getElementById("tishi3").innerHTML="";
        document.getElementById("reginster").removeAttribute("disabled");
        document.getElementById("reginster").style.backgroundColor  = '#5D9CEC';
    }
}
//判断邮箱格式是否正确
function toEmail() {
    var email = document.getElementById("email").value;
    if(email != "") {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        //调用正则验证test()函数,返回值是boolean类型
        isok= reg.test(email);
        if(!isok) {
            document.getElementById("tishi2").innerHTML="邮箱格式不正确！";
            document.getElementById("reginster").setAttribute("disabled", true);
            document.getElementById("reginster").style.backgroundColor  = '#555555';
        }
        else{
            document.getElementById("tishi2").innerHTML="";
            document.getElementById("reginster").removeAttribute("disabled");
            document.getElementById("reginster").style.backgroundColor  = '#5D9CEC';
        }
    }

}
//提交注册信息           
function toReginster() {
    var email = document.getElementById("email").value;
    var userId = document.getElementById("userId").value;
    var password = document.getElementById("password").value;
    var password1 = document.getElementById("password1").value;
    if (email != "" && userId != "" && password != "" && password1 != "") {
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/user/register",
            dataType: 'json',
            data: {
                userId: userId,
                password: password,
                email:email
            },
            success: function (result) {
                if(result.code == 400)
                    alert(result.message);
                else{
                    alert('注册成功！两秒后跳转到登录页面');
                    setTimeout(function(){
                        var windowOpen = window.open('login.html','_self');				
                    }, 2000);
                }
                                               
            }
        });
    }
    else{
        alert('账号或邮箱或密码不能为空！');
    }
    
}

//回车事件
document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) { //回车键的键值为13
        $("#reginster").click(); //调用登录按钮的登录事件
    }
};