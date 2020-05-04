var userId1 = sessionStorage.getItem('userId');
var url=window.location.search; //获取url中"?"符后的字串  
if(url.indexOf("?")!=-1){
    var invitationId = url.substr(url.indexOf("=")+1);
}
document.getElementById('invitationId').innerHTML = invitationId;
var btnStop = document.getElementById('btnStop');
var btnRecommend = document.getElementById('btnRecommend');

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
        url: 'http://120.79.232.81:9000/invitation/adminInvitation',
        dataType: 'json',
        data: {
            invitationId: invitationId
        },
        success: function (result) {
            if(result.code == 200){
                if(result.data.invitationInfo.recommend == 1){
                    btnRecommend.innerHTML = '取推';
                }else{
                    btnRecommend.innerHTML = '推荐';
                }
                var state;
                if(result.data.invitationInfo.state == 1){
                    state = '禁用';
                    btnStop.innerHTML = '解禁';
                }else{
                    state = '正常';
                    btnStop.innerHTML = '禁用';
                }
                var classify;
                if(result.data.invitationInfo.classify == 0){
                    classify = '人文风景';
                }else if(result.data.invitationInfo.classify == 1){
                    classify = '美食文化';
                }else if(result.data.invitationInfo.classify == 2){
                    classify = '风俗习惯';
                }else if(result.data.invitationInfo.classify == 3){
                    classify = '语言魅力';
                }else if(result.data.invitationInfo.classify == 4){
                    classify = '娱乐活动';
                }
                var imgUrl;
                if(result.data.invitationInfo.imgUrl != '' && result.data.invitationInfo.imgUrl != null){
                    imgUrl = result.data.invitationInfo.imgUrl;
                    document.getElementById('imgUrl').src = imgUrl;
                    document.getElementById('imgUrl').style.display = 'block';
                }else{
                    document.getElementById('imgUrl').style.display = 'none';
                }
                var classify = classify + ' ' + result.data.invitationInfo.regoin;

                document.getElementById('userId').innerHTML = result.data.invitationInfo.userId;
                document.getElementById('state').innerHTML = state;
                document.getElementById('createTime').innerHTML = result.data.invitationInfo.createTime;
                document.getElementById('classify').innerHTML = classify;
                document.getElementById('title').innerHTML = result.data.invitationInfo.title;
                document.getElementById('introduce').innerHTML = result.data.invitationInfo.introduce;
                document.getElementById('context').innerHTML = result.data.invitationInfo.context;
                document.getElementById('pageView').innerHTML = result.data.invitationInfo.pageView;
                document.getElementById('likeNum').innerHTML = result.data.likeNum;
                document.getElementById('collectNum').innerHTML = result.data.collectNum;
                document.getElementById('commentNum').innerHTML = result.data.commentNum;

                for (i in result.data.commentList) {
                    if(result.data.commentList[i].targetName ==null ){
                        result.data.commentList[i].targetName = '无'
                    }
                    var tr;
                    tr = 
                        '<td>' + result.data.commentList[i].commentatorName + '</td>' +
                        '<td>' + result.data.commentList[i].targetName + '</td>' +
                        '<td>' + result.data.commentList[i].context + '</td>' +
                        '<td>' + result.data.commentList[i].createTime + '</td>' 
                        
                    $("#commentlist").append('<tr>' + tr + '</tr>')
                }
            }
        }
    });
});



function recommend(){
    if(btnRecommend.innerHTML == '推荐'){
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/invitation/recommentInvitation',
            dataType: 'json',
            data: {
                invitationId: invitationId
            },
            success: function (result) {
                if(result.code == 200){
                    alert('帖子首页推荐成功！');
                    location.reload(true);
                }else{
                    alert(result.message);
                }
            }
        });
    }else{
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/invitation/deleterecommentInvitation',
            dataType: 'json',
            data: {
                invitationId: invitationId
            },
            success: function (result) {
                if(result.code == 200){
                    alert('帖子首页取消推荐成功！');
                    location.reload(true);
                }else{
                    alert(result.message);
                }
            }
        });
    }
}

function toStop(){
    if(btnStop.innerHTML == '禁用'){
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/invitation/banInvitation',
            dataType: 'json',
            data: {
                invitationId: invitationId
            },
            success: function (result) {
                if(result.code == 200){
                    alert('帖子禁用成功！');
                    location.reload(true);
                }else{
                    alert(result.message);
                }
            }
        });
    }else{
        $.ajax({
            type: 'post',
            url: 'http://120.79.232.81:9000/invitation/deletebanInvitation',
            dataType: 'json',
            data: {
                invitationId: invitationId
            },
            success: function (result) {
                if(result.code == 200){
                    alert('帖子解禁成功！');
                    location.reload(true);
                }else{
                    alert(result.message);
                }
            }
        });
    }
}