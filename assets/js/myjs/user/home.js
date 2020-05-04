
var userId = sessionStorage.getItem('userId');

//加载初始页面
$(document).ready(function(){
    if(userId == null){
        var user = document.getElementById('user');
        var land = document.getElementById('land');
        user.style.display = 'none';
        land.style.display = 'block';
    }
    else{
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/user/ShowPersonalInformation',
            dataType: 'json',
            data: {
                userId: userId
            },
            success: function (result) {
                if(result.code == 200){
                    user.innerHTML = '欢迎！' + ' ' + result.data.userName;
                }
            }
        })
        var user = document.getElementById('user');
        var land = document.getElementById('land');
        user.style.display = 'block';
        land.style.display = 'none';
    }   
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/InvitationVO/selectPartInvitation',
        dataType: 'json',
        success: function (result) {
            if(result.code == 200){
                var data = result.data;
                //推荐列表                
                for (i in data.invitationList) {
                    var button;
                    if(data.invitationList[i].imgUrl != null && data.invitationList[i].imgUrl != ''){
                        button = 
                        '<div>' + 
                            '<div style="display: flex;flex-wrap: nowrap;">' + 
                            '<img src="'+data.invitationList[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
                                '<div>' + 
                                    '<div style="font-weight:600;padding:6px 0;">' + data.invitationList[i].title + '</div>' + 
                                    '<div>' + data.invitationList[i].introduce + '</div>' + 
                                '</div>' +
                            '</div>' +
                            '<div style="padding:20px 0 10px;display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                '<span>' + '评论：' +'<span>' + data.invitationList[i].commentNum + '</span>' + '</span>' +
                                '<span>' + '浏览：' +'<span>' + data.invitationList[i].pageView + '</span>' + '</span>' +
                                '<span>' + '楼主：' +'<span>' + data.invitationList[i].userName + '</span>' + '</span>' +
                                '<span>' + '时间：' +'<span>' + data.invitationList[i].createTime + '</span>' + '</span>' + 
                            '</div>' +
                        '</div>';
                    }else{
                        button = 
                        '<div>' + 
                            '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<div>' + 
                                    '<div style="font-weight:600;padding:6px 0;">' + data.invitationList[i].title + '</div>' + 
                                    '<div>' + data.invitationList[i].introduce + '</div>' + 
                                '</div>' +
                            '</div>' +
                            '<div style="padding:20px 0 10px;display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                '<span>' + '评论：' +'<span>' + data.invitationList[i].commentNum + '</span>' + '</span>' +
                                '<span>' + '浏览：' +'<span>' + data.invitationList[i].pageView + '</span>' + '</span>' +
                                '<span>' + '楼主：' +'<span>' + data.invitationList[i].userName + '</span>' + '</span>' +
                                '<span>' + '时间：' +'<span>' + data.invitationList[i].createTime + '</span>' + '</span>' + 
                            '</div>' +
                        '</div>';
                    }
                    
                    $("#recommend").append('<button type="button" class="list-group-item" style="outline:none;" onclick="openContents(' + data.invitationList[i].invitationId + ')">' + button + '</button>');
                }

                //热搜列表
                for (i in data.hostList) {
                    var li;
                    li = 
                        '<li>' + 
                            '<a href ="javascript:void(0);" onclick="openContents(' + data.hostList[i].invitationId + ')">' + 
                            data.hostList[i].title  + '</a>' +
                            '<p style="color: gainsboro;font-size: 12px;">' + 
                                '浏览：' + data.hostList[i].pageView +
                            '<p>' + 
                        '</li>';
                    $("#hot").append(li);
                }

                //达人列表
                for (i in data.theMostFansUser) {
                    var div;
                    div = 
                        '<div style="display: flex;flex-wrap: nowrap;justify-content: space-between;">' +
                            '<div style="display: flex;flex-wrap: nowrap;">' +
                                '<img src="'+data.theMostFansUser[i].imgAddress+'" class="img-circle" style="height: 42px;width: 42px;margin: 6px 0;">' + 
                                '<a href ="javascript:void(0);" onclick="openPersonal(' + data.theMostFansUser[i].userId + ')" style="margin: 16px;">' + data.theMostFansUser[i].userName + '</a>' + 
                            '</div>' +
                            '<button type="button" class="button2" aria-hidden="true" onclick="openCare(' + data.theMostFansUser[i].userId + ')">' + 
                                '关注' + 
                            '</button>' 
                        '</div>';
                    $("#userHot").append(div);
                }
            }
            
        }
    });
});


//搜索
function onSearch() {
    var searchTitle = document.getElementById("searchTitle").value;
    $.ajax({
        type: 'post',
        url: "http://120.79.232.81:9000/InvitationVO/selectInvitationByTitle",
        dataType: 'json',
        data: {
            title: searchTitle,
        },
        success: function (result) {
            if(result.code == 200) {
                $("#recommend").empty();//清空列表
                var data = result.data
                //推荐列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl !=''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                    '<img src="' + data[i].imgUrl + '" style="margin:10px 6px 0 0;height:60px;width:100px">' + 
                                    '<div>' + 
                                        '<div style="font-weight:600;padding:6px 0;">' + data[i].title + '</div>' + 
                                        '<div>' + data[i].introduce + '</div>' + 
                                    '</div>' +
                                '</div>' +
                                '<div style="padding:20px 0 10px;display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                    '<span>' + '评论：' +'<span>' + data[i].commentNum + '</span>' + '</span>' +
                                    '<span>' + '浏览：' +'<span>' + data[i].pageView + '</span>' + '</span>' +
                                    '<span>' + '楼主：' +'<span>' + data[i].userName + '</span>' + '</span>' +
                                    '<span>' + '时间：' +'<span>' + data[i].createTime + '</span>' + '</span>' + 
                                '</div>' +
                            '</div>';
                    }else{
                        button = 
                        '<div>' + 
                            '<div style="display: flex;flex-wrap: nowrap;">' + 
                                
                                '<div>' + 
                                    '<div style="font-weight:600;padding:6px 0;">' + data[i].title + '</div>' + 
                                    '<div>' + data[i].introduce + '</div>' + 
                                '</div>' +
                            '</div>' +
                            '<div style="padding:20px 0 10px;display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                '<span>' + '评论：' +'<span>' + data[i].commentNum + '</span>' + '</span>' +
                                '<span>' + '浏览：' +'<span>' + data[i].pageView + '</span>' + '</span>' +
                                '<span>' + '楼主：' +'<span>' + data[i].userName + '</span>' + '</span>' +
                                '<span>' + '时间：' +'<span>' + data[i].createTime + '</span>' + '</span>' + 
                            '</div>' +
                        '</div>';
                    }
                    $("#recommend").append('<button type="button" class="list-group-item" style="outline:none;" onclick="openContents(' + data[i].invitationId + ')">' + button + '</button>');
                }
            }
            
        }
    });
}

//帖子详情跳转
function openContents(e) {
    window.open('concrete.html?invitationId=' + e + '','_blank');//打开页面并传递invitationId
}

//关注
function openCare(e) {
    if(userId == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    if(userId != e){
                        $.ajax({
                            type:'post',
                            url:'http://120.79.232.81:9000/attention/addAttentionInfo',
                            dataType:'json',
                            data:{
                                userId: userId,
                                targetId: e
                            },
                            success:function (result) {
                                if(result.code == 200){
                                    alert("关注成功！");
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }else{
                        alert('不能关注自己哦~');
                    }
                }
            }
        });
    }
}

//他人主页跳转
function openPersonal(e){
    window.open('personal.html?userId='+e+'','_blank');
}

//个人主页跳转
function personal() {
    //判断是否登录
    if(userId == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    window.open('personal.html?userId='+userId+'','_blank');//打开页面并传递userid
                }
            }
        });
    }
}


//我的关注跳转
function openAttention(){
    //判断是否登录
    if(userId == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    window.open('attention.html?userId='+userId+'','_self'); 
                }
            }
        });
    }
}


//我的收藏跳转
function openCollect(){
    //判断是否登录
    if(userId == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    window.open('collect.html?userId='+userId+'','_self');
                }
            }
        });
    }
}


//写帖子跳转
function openWrite() {
    //判断是否登录
    if(userId == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    window.open('write.html','_blank');
                }
            }
        });
    }
}