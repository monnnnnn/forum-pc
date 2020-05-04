var userId1 = sessionStorage.getItem('userId');

$(document).ready(function() {
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/user/ShowPersonalInformation',
        dataType: 'json',
        data: {
            userId: userId1
        },
        success: function (result) {
            if(result.code == 200){
                document.getElementById('userId1').innerHTML = result.data.userName;
            }
        }
    });
});

//添加账号
function toadduser() {
    var userId = document.getElementById("userId").value;
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var selRole = document.getElementById('role');
    var role = selRole.options[selRole.selectedIndex].value;//选择的版块
    var userRole;
    if(role == '管理员'){
        userRole = 1;
    }else{
        userRole = 0;
    }
    console.log(userId+userName+password+email+userRole);
    if(userId1 != '' && userId1 != null){
        if (password != "" && userName != "" && userId != "" && email != "") {
            $.ajax({
                type: 'post',
                url: "http://120.79.232.81:9000/user/registerAdmin",
                dataType: 'json',
                data: {
                    userId: userId,
                    userName: userName,
                    password: password,
                    email:email,
                    userRole:userRole
                },
                success: function (result) {
                    if(result.code==200)
                    window.open('userDetail.html?userId='+userId+'','_self');
                    else {
                        alert(result.message);
                    }
                }
            });
        }else{
            alert("账号或密码或昵称或邮箱不能为空！")
        }          
    }else{
        alert('请先登录！一秒后跳转');
        setTimeout(function(){
            var windowOpen = window.open('../login.html','_self');				
        }, 1000);
    }
}

//判断密码是否相同
function toPass() {
    var password = document.getElementById("password").value;
    var password1 = document.getElementById("password1").value;
    if(password != password1){
        document.getElementById("tishi").style.visibility = 'visible';
        document.getElementById("submit").setAttribute("disabled", true);
    }
    else{
        document.getElementById("tishi").style.visibility = 'hidden';
        document.getElementById("submit").removeAttribute("disabled");
    }
}