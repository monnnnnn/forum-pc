var userId = sessionStorage.getItem('userId');

$(document).ready(function() {
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/user/ShowPersonalInformation',
        dataType: 'json',
        data: {
            userId: userId
        },
        success: function (result) {
            if(result.code == 200){
                document.getElementById('userId').innerHTML = result.data.userName;
            }
        }
    })

    if(userId != '' && userId != null){
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/user/getAllUserInfo",
            dataType: 'json',
            success: function (result) {
                if(result.code == 200){
                    var state;
                    var userRole;
                    for (i in result.data) {
                        
                        if(result.data[i].userRole == 0){
                            userRole = '用户';
                        }else{
                            userRole = '管理员';
                        }
                        if(result.data[i].state == 0){
                            state = '正常';
                        }else{
                            state = '禁用';
                        }
                        var tr;
                        tr = '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].userName + '</td>' +
                            '<td>' + result.data[i].email + '</td>' +
                            '<td>' + userRole + '</td>' +
                            '<td>' + state + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button class="btn btn-info btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDetail(' + result.data[i].userId + ')" >' + "详情" + '</button>' +
                            '</td>'
                        $("#userlist").append('<tr>' + tr + '</tr>')
                    }
                }
            }
        });
    }else{
        alert('请先登录！一秒后跳转');
        setTimeout(function(){
            var windowOpen = window.open('../login.html','_self');				
        }, 1000);
    }
});

function toDetail(e) {
    window.open('userDetail.html?userId=' + e + '','_blank');
}


function toFind() {
    var userIdFind = document.getElementById("userIdFind").value;
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/user/getUserInfosByUserId",
            dataType: 'json',
            data: {
                userId: userIdFind,
            },
            success: function (result) {
                if(result.code == 200){
                    $("#userlist").empty();
                    for (i in result.data) {
                        var tr;
                        tr = '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].userName + '</td>' +
                            '<td>' + result.data[i].email + '</td>' +
                            '<td>' + result.data[i].userRole + '</td>' +
                            '<td>' + result.data[i].state + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button class="btn btn-info btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDetail(' + result.data[i].userId + ')" >' + "详情" + '</button>' +
                            '</td>'
                        $("#userlist").append('<tr>' + tr + '</tr>')
                    }
                }
            }
        });
    }