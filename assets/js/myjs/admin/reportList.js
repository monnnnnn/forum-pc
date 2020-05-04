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
            url: "http://120.79.232.81:9000/Accuse/getAccuseList",
            dataType: 'json',
            success: function (result) {
                if(result.code == 200){
                    var classify;
                    for (i in result.data) {
                        if(result.data[i].classify == 0){
                            classify = '帖子';
                        }else if(result.data[i].classify == 1){
                            classify = '账号';
                        }
                        if(result.data[i].dealTime == null){
                            dealTime = '暂无';
                        }else{
                            dealTime = result.data[i].dealTime;
                        }
                        var dealState;
                        if(result.data[i].dealState == 1){
                            dealState = '已处理';
                            
                        }else{
                            dealState = '未处理';
                            
                        }
                        var tr;
                        tr =
                            '<td>' + result.data[i].targetId + '</td>' +
                            '<td>' + classify + '</td>' +
                            '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].context + '</td>' +
                            '<td>' + result.data[i].createTime + '</td>' +
                            '<td>' + dealState + '</td>' +
                            '<td>' + dealTime + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button  class="btn btn-danger btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDeal(' + result.data[i].accuseId + ')" >' + "处理" + '</button>' +
                            '</td>'
                        $("#reportlist").append('<tr>' + tr + '</tr>')
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

//处理
function toDeal(e) {
    $.ajax({
        type: 'post',
        url: "http://120.79.232.81:9000/Accuse/dealAccuse",
        dataType: 'json',
        data: {
            accuseId: e,
        },
        success: function (result) {
            if(result.code == 200){
                alert('处理成功！');
                location.reload(true);
            }else{
                alert(result.message);
            }
        }
    });
}


function toFind() {
    var targetIdFind = document.getElementById("targetIdFind").value;
    if(targetIdFind != ''){
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/Accuse/getAccuseListByTargetId",
            dataType: 'json',
            data: {
                targetId: targetIdFind,
            },
            success: function (result) {
                if(result.code == 200){
                    $("#reportlist").empty();
                    var classify;
                    for (i in result.data) {
                        if(result.data[i].classify == 0){
                            classify = '帖子';
                        }else if(result.data[i].classify == 1){
                            classify = '账号';
                        }
                        var tr;
                        tr =
                        '<td>' + result.data[i].targetId + '</td>' +
                        '<td>' + classify + '</td>' +
                        '<td>' + result.data[i].userId + '</td>' +
                        '<td>' + result.data[i].context + '</td>' +
                        '<td>' + result.data[i].createTime + '</td>' +
                        '<td>' + result.data[i].dealState + '</td>' +
                        '<td>' + result.data[i].dealTime + '</td>' +
                        '<td style="text-align:center;">' +
                        '<button class="btn btn-danger btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDeal(' + result.data[i].accuseId + ')" >' + "处理" + '</button>' +
                        '</td>'
                        $("#reportlist").append('<tr>' + tr + '</tr>')
                    }
                }
            }
        });
    }else{
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/Accuse/getAccuseList",
            dataType: 'json',
            success: function (result) {
                if(result.code == 200){
                    $("#reportlist").empty();
                    var classify;
                    for (i in result.data) {
                        if(result.data[i].classify == 0){
                            classify = '帖子';
                        }else if(result.data[i].classify == 1){
                            classify = '账号';
                        }
                        if(result.data[i].dealTime == null){
                            dealTime = '暂无';
                        }else{
                            dealTime = result.data[i].dealTime;
                        }
                        var tr;
                        tr =
                            '<td>' + result.data[i].targetId + '</td>' +
                            '<td>' + classify + '</td>' +
                            '<td>' + result.data[i].userId + '</td>' +
                            '<td>' + result.data[i].context + '</td>' +
                            '<td>' + result.data[i].createTime + '</td>' +
                            '<td>' + result.data[i].dealState + '</td>' +
                            '<td>' + dealTime + '</td>' +
                            '<td style="text-align:center;">' +
                            '<button class="btn btn-danger btn-xs" data-toggle="modal" data-target="#changeSource" style="padding:1px 4px;margin-left:5px" onclick="toDeal(' + result.data[i].accuseId + ')" >' + "处理" + '</button>' +
                            '</td>'
                        $("#reportlist").append('<tr>' + tr + '</tr>')
                    }
                }
            }
        });
    }
        
}