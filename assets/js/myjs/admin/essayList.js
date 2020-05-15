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
    });

    if(userId != '' && userId != null){
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/invitation/getAllInvitation",
            dataType: 'json',
            success: function (result) {
                if(result.code == 200){
                    var classify;
                    for (i in result.data) {
                        if(result.data[i].classify == 0){
                            classify = '人文风景';
                        }else if(result.data[i].classify == 1){
                            classify = '美食文化';
                        }else if(result.data[i].classify == 2){
                            classify = '风俗习惯';
                        }else if(result.data[i].classify == 3){
                            classify = '语言魅力';
                        }else if(result.data[i].classify == 4){
                            classify = '娱乐活动';
                        }
                        var state;
                        if(result.data[i].state == 1){
                            state = '禁用';
                            
                        }else{
                            state = '正常';
                            
                        }
                        var tr;
                        tr = '<td>' + result.data[i].invitationId + '</td>' +
                            '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].title + '</td>' +
                            '<td>' + classify + '</td>' +
                            '<td>' + result.data[i].regoin + '</td>' +
                            '<td>' + result.data[i].createTime + '</td>' +
                            '<td>' + state + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button class="btn btn-info btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDetail(' + result.data[i].invitationId + ')" >' + "详情" + '</button>' +
                            '</td>'
                        $("#essaylist").append('<tr>' + tr + '</tr>')
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
    window.open('essayDetail.html?invitationId=' + e + '','_blank');
}


function toFind() {
    var invitationIdFind = document.getElementById("invitationIdFind").value;
    if(invitationIdFind != ''){
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/invitation/selectInvitationByInvitationId",
            dataType: 'json',
            data: {
                invitationId: invitationIdFind,
            },
            success: function (result) {
                if(result.code == 200){
                    $("#essaylist").empty();
                    var classify;
                    for (i in result.data) {
                        if(result.data[i].classify == 0){
                            classify = '人文风景';
                        }else if(result.data[i].classify == 1){
                            classify = '美食文化';
                        }else if(result.data[i].classify == 2){
                            classify = '风俗习惯';
                        }else if(result.data[i].classify == 3){
                            classify = '语言魅力';
                        }else if(result.data[i].classify == 4){
                            classify = '娱乐活动';
                        }
                        var state;
                        if(result.data[i].state == 1){
                            state = '禁用';
                            
                        }else{
                            state = '正常';
                            
                        }
                        var tr;
                        tr = '<td>' + result.data[i].invitationId + '</td>' +
                            '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].title + '</td>' +
                            '<td>' + classify + '</td>' +
                            '<td>' + result.data[i].regoin + '</td>' +
                            '<td>' + result.data[i].createTime + '</td>' +
                            '<td>' + state + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button class="btn btn-info btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDetail(' + result.data[i].invitationId + ')" >' + "详情" + '</button>' +
                            '</td>'
                        $("#essaylist").append('<tr>' + tr + '</tr>')
                    }
                }
            }
        });
    }else{
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/invitation/getAllInvitation",
            dataType: 'json',
            success: function (result) {
                if(result.code == 200){
                    $("#essaylist").empty();
                    var classify;
                    for (i in result.data) {
                        if(result.data[i].classify == 0){
                            classify = '人文风景';
                        }else if(result.data[i].classify == 1){
                            classify = '美食文化';
                        }else if(result.data[i].classify == 2){
                            classify = '风俗习惯';
                        }else if(result.data[i].classify == 3){
                            classify = '语言魅力';
                        }else if(result.data[i].classify == 4){
                            classify = '娱乐活动';
                        }
                        var state;
                        if(result.data[i].state == 1){
                            state = '禁用';
                            
                        }else{
                            state = '正常';
                            
                        }
                        var tr;
                        tr = '<td>' + result.data[i].invitationId + '</td>' +
                            '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].title + '</td>' +
                            '<td>' + classify + '</td>' +
                            '<td>' + result.data[i].regoin + '</td>' +
                            '<td>' + result.data[i].createTime + '</td>' +
                            '<td>' + state + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button class="btn btn-info btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDetail(' + result.data[i].invitationId + ')" >' + "详情" + '</button>' +
                            '</td>'
                        $("#essaylist").append('<tr>' + tr + '</tr>')
                    }
                }
            }
        });
    }
}