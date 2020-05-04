function toEmail() {
    var email = document.getElementById("email").value;
    if(email != "") {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        //调用正则验证test()函数
        isok= reg.test(email);
        if(!isok) {
            document.getElementById("tishi").innerHTML="邮箱格式不正确！";
            document.getElementById("submit").setAttribute("disabled", true);
            document.getElementById("submit").style.backgroundColor  = '#555555';
        }
        else{
            document.getElementById("tishi").innerHTML="";
            document.getElementById("submit").removeAttribute("disabled");
            document.getElementById("submit").style.backgroundColor  = '#5D9CEC';
        }
    };

}

//判断密码是否相同
function toPass() {
    var password = document.getElementById("password").value;
    var password1 = document.getElementById("password1").value;
    if(password != password1){
        document.getElementById("tishi3").innerHTML="两次密码不相同！";
        document.getElementById("submit").setAttribute("disabled", true);
        document.getElementById("submit").style.backgroundColor  = '#555555';
    }
    else{
        document.getElementById("tishi3").innerHTML="";
        document.getElementById("submit").removeAttribute("disabled");
        document.getElementById("submit").style.backgroundColor  = '#5D9CEC';
    }
}

function send() {
    var email = document.getElementById('email').value;
    if(email == '') {
        alert('邮箱不能为空！');
    }
    else{
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/user/forgetPassword",
            dataType: 'json',
            data: {
                email: email
            },
            success: function (result) {
                if(result.code == 400){
                    alert(result.message);
                }
                else{
                    alert('发送成功！验证码将在2分钟后失效');
                }
            }
        })
    }
}

function next() {
    var password = document.getElementById("password").value;
    var email = document.getElementById('email').value;
    var captcha = document.getElementById('captcha').value;
    if(email != '' && captcha !='') {
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/user/checkVerificationCode",
            dataType: 'json',
            data: {
                newPassword: password,
                email: email,
                verificationCode: captcha
            },
            success: function (result) {
                if(result.code == 400){
                    alert('验证码已失效或错误');
                }else{
                    alert('修改密码成功！两秒后跳转到登录页面');
                    setTimeout(function(){
                        window.open('login.html','_self');				
                    }, 2000);
                }
            }
        })
    }
    else{
        alert('邮箱或验证码为空！');
    }
}