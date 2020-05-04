var userId = sessionStorage.getItem('userId');

//页面打开时加载
window.onload = function(){
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
        url: 'http://120.79.232.81:9000/InvitationVO/selectInvitationByClassify',
        dataType: 'json',
        data:{
            classify: 0,
        },
        success: function (result) {
            if(result.code == 200){
                var data = result.data
                //全部列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl != ''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<img src="'+data[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
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
};

//筛选全部
function onAll(){
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/InvitationVO/selectInvitationByClassify',
        dataType: 'json',
        data:{
            classify: 0,
        },
        success: function (result) {
            if(result.code == 200){
                var data = result.data
                //全部列表
                $("#recommend").empty();//清空列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl != ''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<img src="'+data[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
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
                document.getElementById('all').style.color = 'black';
                document.getElementById('foShan').style.color = '#337ab7';
                document.getElementById('guangZhou').style.color = '#337ab7';
                document.getElementById('zhongShan').style.color = '#337ab7';
            }
            
        }
    });
}

//筛选中山市
function zhongShan(){
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/InvitationVO/selectInvitationByClassifyAndRegoin',
        dataType: 'json',
        data:{
            classify: 0,
            regoin: '中山市',
        },
        success: function (result) {
            if(result.code == 200){
                var data = result.data
                //中山市列表
                $("#recommend").empty();//清空列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl != ''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<img src="'+data[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
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
                document.getElementById('all').style.color = '#337ab7';
                document.getElementById('foShan').style.color = '#337ab7';
                document.getElementById('guangZhou').style.color = '#337ab7';
                document.getElementById('zhongShan').style.color = 'black';

            }
            
        }
    });
}

//筛选广州市
function guangZhou(){
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/InvitationVO/selectInvitationByClassifyAndRegoin',
        dataType: 'json',
        data:{
            classify: 0,
            regoin: '广州市',
        },
        success: function (result) {
            if(result.code == 200){
                var data = result.data
                //广州市列表
                $("#recommend").empty();//清空列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl != ''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<img src="'+data[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
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
                document.getElementById('all').style.color = '#337ab7';
                document.getElementById('foShan').style.color = '#337ab7';
                document.getElementById('guangZhou').style.color = 'black';
                document.getElementById('zhongShan').style.color = '#337ab7';

            }
            
        }
    });
}

//筛选佛山市
function foShan(){
    $.ajax({
        type: 'post',
        url: 'http://120.79.232.81:9000/InvitationVO/selectInvitationByClassifyAndRegoin',
        dataType: 'json',
        data:{
            classify: 0,
            regoin: '佛山市',
        },
        success: function (result) {
            if(result.code == 200){
                var data = result.data
                //佛山市列表
                $("#recommend").empty();//清空列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl != ''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<img src="'+data[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
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
                document.getElementById('all').style.color = '#337ab7';
                document.getElementById('foShan').style.color = 'black';
                document.getElementById('guangZhou').style.color = '#337ab7';
                document.getElementById('zhongShan').style.color = '#337ab7';

            }
            
        }
    });
}

//搜索
function onSearch() {
    var searchTitle = document.getElementById("searchTitle").value;
    console.log(searchTitle);
    $.ajax({
        type: 'post',
        url: "http://120.79.232.81:9000/InvitationVO/selectInvitationByClassifyAndTitle",
        dataType: 'json',
        data: {
            classify: 0,
            title: searchTitle,
        },
        success: function (result) {
            if(result.code == 200) {
                $("#recommend").empty();//清空列表
                var data = result.data
                //搜索列表
                for (i in data) {
                    var button;
                    if(data[i].imgUrl != null && data[i].imgUrl != ''){
                        button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                '<img src="'+data[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
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
                    window.open('write.html?userId='+userId+'','_blank');
                }
            }
        });
    }
}