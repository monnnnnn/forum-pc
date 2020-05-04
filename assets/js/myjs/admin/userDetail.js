var userId1 = sessionStorage.getItem('userId');
var url=window.location.search; //获取url中"?"符后的字串  
if(url.indexOf("?")!=-1){
    var userId = url.substr(url.indexOf("=")+1);
}
document.getElementById('userId').innerHTML = userId;
var btnStop = document.getElementById('btnStop');

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

    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/user/getUserDetail',
        dataType: 'json',
        data: {
            userId: userId
        },
        success: function (result) {
            if(result.code == 200){
                var userRole;
                var state;
                if(result.data.userDetail.userRole == 1){
                    userRole = '管理员';
                }else{
                    userRole = '用户';
                }
                if(result.data.userDetail.state == 1){
                    state = '禁用';
                    btnStop.innerHTML = '解禁';
                }else{
                    state = '正常';
                    btnStop.innerHTML = '禁用';
                }
                document.getElementById('userName').innerHTML = result.data.userDetail.userName;
                document.getElementById('head').src = result.data.userDetail.imgAddress;
                document.getElementById('email').innerHTML = result.data.userDetail.email;
                document.getElementById('remarks').innerHTML = result.data.userDetail.remarks;
                document.getElementById('role').innerHTML = userRole;
                document.getElementById('attentionNum').innerHTML = result.data.attentionNum;
                document.getElementById('fansNum').innerHTML = result.data.fansNum;
                document.getElementById('invitationNum').innerHTML = result.data.invitationNum;
                document.getElementById('collectNum').innerHTML = result.data.collectNum;
                document.getElementById('state').innerHTML = state;
            }
        }
    });
});



function toReset(){
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/user/resetUserPassword',
        dataType: 'json',
        data: {
            userId: userId
        },
        success: function (result) {
            if(result.code == 200){
                alert('重置成功！重置后密码为123456');
            }else{
                alert(result.message);
            }
        }
    });
}

function toStop(){
    if(btnStop.innerHTML == '禁用'){
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/user/banUser',
            dataType: 'json',
            data: {
                userId: userId
            },
            success: function (result) {
                if(result.code == 200){
                    alert('账号禁用成功！');
                    location.reload(true);
                }else{
                    alert(result.message);
                }
            }
        });
    }else{
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/user/deleteBanUser',
            dataType: 'json',
            data: {
                userId: userId
            },
            success: function (result) {
                if(result.code == 200){
                    alert('账号解禁成功！');
                    location.reload(true);
                }else{
                    alert(result.message);
                }
            }
        });
    }
    
}