var userId1 = sessionStorage.getItem('userId');
var url=window.location.search; //获取url中"?"符后的字串  
if(url.indexOf("?")!=-1){
    var invitationId = url.substr(url.indexOf("=")+1);
}

//页面打开时加载
window.onload = function(){
    if(userId1 == null){
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
                userId: userId1
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

    //加载初始页面
    $(document).ready(function(){
        var url=window.location.search; //获取url中"?"符后的字串  
        if(url.indexOf("?")!=-1){
            var invitationId = url.substr(url.indexOf("=")+1);
        }
        $.ajax({
            type: 'post',
            url: "http://120.79.232.81:9000/invitation/invitation",
            dataType: 'json',
            data: {
                invitationId: invitationId,
                userId: userId1
            },
            success: function (result) {
                if(result.code==200){
                    var data =  result.data;
                    
                    document.getElementById('title').innerHTML = data.invitationInfo.title;
                    document.getElementById('time').innerHTML = '编辑于' + data.invitationInfo.createTime;
                    document.getElementById('like').innerHTML = '点赞：' + data.likesNum;
                    document.getElementById('collect').innerHTML = '收藏：' + data.collectNum;
                    document.getElementById('browse').innerHTML = '浏览：' + data.invitationInfo.pageView;
                    document.getElementById('imgHead').src = data.UserInfo.imgAddress;
                    document.getElementById('userId').innerHTML = data.UserInfo.userId;
                    document.getElementById('userName').innerHTML = data.UserInfo.userName;
                    document.getElementById('remarks').innerHTML = '简介：' + data.UserInfo.remarks;
                    document.getElementById('essay').innerHTML = data.invitationInfo.context;

                    //判断点赞初始状态
                    if(!data.like){
                        btnLike.style.color = 'gray';
                    }else{
                        btnLike.style.color = 'red';
                    }
                    //判断收藏初始状态
                    if(!data.collect){
                        btnCollect.style.color = 'gray';
                    }else{
                        btnCollect.style.color = 'red';
                    }

                    //评论列表
                    for (i in data.commentList) {
                        var div;                        
                        if(data.commentList[i].targetName == null){
                            div = 
                            '<div style="display: flex;flex-wrap: nowrap;margin: 5px 0;">' + 
                                '<img src="'+data.commentList[i].imgAddress+'" class="img-circle" style="height: 42px;width: 42px;margin: 6px 0;">' + 
                                '<div style="margin: 20px 20px;width: 700px;">' +
                                    '<div style="display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                        '<a href ="javascript:void(0);" onclick="commentPersonal('+data.commentList[i].commentId+')">' + data.commentList[i].commentatorName + '</a>' + 
                                        '<p>' + '<span>' + '时间：' + data.commentList[i].createTime + '</span></p>' + 
                                    '</div>' +
                                    '<p>' + data.commentList[i].context + '</p>' +
                                    '<button type="button" onclick="btnReply('+data.commentList[i].commentId+')" class="button2" aria-hidden="true" style="margin: 5px 0;width: 60px;float: right;border: none;">' + 
                                    '回复' + 
                                    '</button>' +
                                '</div>' +
                            '</div>';
                        }else{
                            div = 
                            '<div style="display: flex;flex-wrap: nowrap;margin: 5px 0;">' + 
                                '<img src="'+data.commentList[i].imgAddress+'" class="img-circle" style="height: 42px;width: 42px;margin: 6px 0;">' + 
                                '<div style="margin: 20px 20px;width: 700px;">' +
                                    '<div style="display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                    '<a href ="javascript:void(0);" onclick="commentPersonal('+data.commentList[i].commentId+')">' + data.commentList[i].commentatorName + '</a>' + 
                                        '<p>' + '<span>' + '时间：' + data.commentList[i].createTime + '</span></p>' + 
                                    '</div>' +
                                    '<p>' + '<span id="'+data.commentList[i].targetName+'" style="font-size: 16px;">' + '回复' + data.commentList[i].targetName + '</span>' + data.commentList[i].context + '</p>' +
                                    '<button type="button" onclick="btnReply('+data.commentList[i].commentId+')" class="button2" aria-hidden="true" style="margin: 5px 0;width: 60px;float: right;border: none;">' + 
                                    '回复' + 
                                    '</button>' +
                                '</div>' +
                            '</div>';
                        }

                        $("#recommend").append(div);
                    }

                    //相似文章列表
                    for (i in data.similarList) {
                        var li;
                        li = 
                        '<li>' + 
                            '<a href ="javascript:void(0);" onclick="openContents(' + data.similarList[i].invitationId + ')">' + 
                            data.similarList[i].title  + '</a>' +
                            '<p><span>' + '浏览：' +
                                data.similarList[i].pageView +
                            '</span></p>' + 
                        '</li>';

                        $("#similar").append(li);
                    }

                     //判断是否是本人帖子
                    if(result.data.UserInfo.userId == userId1){
                        var btnDelet = document.getElementById("btnDelet");
                        var btnReport = document.getElementById("btnReport");
                        btnDelet.style.display = 'block';//显示删除按钮
                        btnReport.style.display = 'none';
                    }
                    else{
                        var btnDelet = document.getElementById("btnDelet");
                        var btnReport = document.getElementById("btnReport");
                        btnDelet.style.display = 'none';
                        btnReport.style.display = 'block';
                    }

                }
            }
        });
    })
};

//帖子详情跳转
function openContents(e) {
    window.open('concrete.html?invitationId=' + e + '','_blank');//打开页面并传递invitationId
}

//评论人主页跳转
function commentPersonal(e){
    window.open('personal.html?userId='+e+'','_blank');
}


//他人主页跳转
function openPersonal(){
    var userId = document.getElementById('userId').innerHTML; 
    window.open('personal.html?userId='+userId+'','_blank');
}

//评论跳转
function btnComment(){
    window.location.hash = '#comment';
    document.getElementById('commentId').innerHTML = '';
    document.getElementById('replay').style.visibility = 'hidden';
}

//回复跳转
function btnReply(e){
    window.location.hash = '#comment';
    document.getElementById('commentId').innerHTML = e;
    document.getElementById('replay').style.visibility = 'visible';
}

//编辑评论确定
function btnSubmit(){
    var url=window.location.search; //获取url中"?"符后的字串  
    if(url.indexOf("?")!=-1){
        var invitationId = url.substr(url.indexOf("=")+1);
    }
    var context = document.getElementById('comment').value;
    var commentId = document.getElementById('commentId').innerHTML;
    console.log(commentId);
    //判断是否登录
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    if(commentId != ''){
                        $.ajax({
                            type: 'post',
                            url: 'http://120.79.232.81:9000/comment/replyCommentInfo',
                            dataType: 'json',
                            data: {
                                commentId: commentId,
                                commentatorId: userId1,
                                context: context
                            },
                            success: function (result) {
                                if(result.code == 200){
                                    location.reload(true);
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }else{
                        $.ajax({
                            type: 'post',
                            url: 'http://120.79.232.81:9000/comment/addCommentInfo',
                            dataType: 'json',
                            data: {
                                invitationId:invitationId,
                                commentatorId: userId1,
                                context: context
                            },
                            success: function (result) {
                                if(result.code == 200){
                                    location.reload(true);
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    
}

//关注
function openCare() {
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    var userId = document.getElementById('userId').innerHTML;
                    if(userId != userId1){
                        $.ajax({
                            type:'post',
                            url:'http://120.79.232.81:9000/attention/addAttentionInfo',
                            dataType:'json',
                            data:{
                                userId: userId1,
                                targetId: userId
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

//点赞
function addLike() {
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    var btnLike = document.getElementById('btnLike');  
                    if(btnLike.style.color == 'gray') {
                        var a = 0;
                    }
                    if(a == 0){
                        $.ajax({
                            type: 'post',
                            url: 'http://120.79.232.81:9000/likes/addLikesInfo',
                            dataType: 'json',
                            data: {
                                invitationId:invitationId,
                                userId: userId1
                            },
                            success: function (result) {
                                if(result.code == 200){
                                    btnLike.style.color = 'red';
                                    a++;
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }
                    else{
                        $.ajax({
                            type: 'post',
                            url: 'http://120.79.232.81:9000/likes/deleteLikesInfo',
                            dataType: 'json',
                            data: {
                                invitationId:invitationId,
                                userId: userId1
                            },
                            success: function (result) {
                                if(result.code == 200){
                                    btnLike.style.color = 'gray';
                                    a--;
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }
                    location.reload(true);
                }
            }
        });
    }
}
//收藏
function addCollect() {
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    var btnCollect = document.getElementById('btnCollect');
                    if(btnCollect.style.color == 'gray') {
                        var a = 0;
                    }
                    if(a == 0){
                        $.ajax({
                            type: 'post',
                            url: 'http://120.79.232.81:9000/collect/addCollectInfo',
                            dataType: 'json',
                            data: {
                                invitationId:invitationId,
                                userId: userId1
                            },
                            success: function (result) {
                                if(result.code == 200){
                                    btnCollect.style.color = 'red';
                                    a++;
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }
                    else{
                        $.ajax({
                            type: 'post',
                            url: 'http://120.79.232.81:9000/collect/deleteCollectInfo',
                            dataType: 'json',
                            data: {
                                invitationId:invitationId,
                                userId: userId1
                            },
                            success: function (result) {
                                if(result.code == 200){
                                    btnCollect.style.color = 'gray';
                                    a--;
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }
                    location.reload(true);
                }
            }
        });
    }
}

//举报按钮
function openReport() {
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    var context=prompt("请输入你想举报的原因","");
                    console.log(context);
                    if (context!=null && context!=""){
                        $.ajax({
                            type:'post',
                            url:'http://120.79.232.81:9000/Accuse/addAccuseInvitationInfo',
                            dataType:'json',
                            data:{
                                userId: userId1,
                                targetId: invitationId,
                                context: context
                            },
                            success:function (result) {
                                if(result.code == 200){
                                    alert("举报成功！");
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}

//删除
function onDelete(){
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    $.ajax({
                        type:'post',
                        url:'http://120.79.232.81:9000/invitation/deleteInvitation',
                        dataType:'json',
                        data:{
                            userId: userId1,
                            invitationId: invitationId
                        },
                        success:function (result) {
                            if(result.code == 200){
                                alert('删除成功！2秒后跳转个人页面');
                                setTimeout(function(){
                                    window.open('personal.html?userId='+userId1+'','_self');
                                },2000);
                            }
                            else{
                            alert(result.message);
                            }
                        }
                    });
                }
            }
        });
    }
}

//个人主页跳转
function personal() {
    //判断是否登录
    if(userId1 == null){
        alert('请先登录！');
    }
    else{
        //判断身份是否过期
        $.ajax({
            type:'post',
            url:'http://120.79.232.81:9000/user/isLogin',
            dataType:'json',
            data:{
                userId: userId1,
            },
            success:function (result) {
                if(!result.data){
                    alert('身份已过期，请重新登录！2秒后跳转登陆页面');
                    setTimeout(function(){
                        location.href = '../login.html';
                    },2000);
                }
                else{
                    window.open('personal.html?userId='+userId1+'','_blank');//打开页面并传递userid
                }
            }
        });
    }
}