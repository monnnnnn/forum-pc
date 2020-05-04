
var userId1 = sessionStorage.getItem('userId');
var url=window.location.search; //获取url中"?"符后的字串  
if(url.indexOf("?")!=-1){
    var userId = url.substr(url.indexOf("=")+1);
}

    //加载初始页面
    $(document).ready(function(){
        //判断是否登录，显示欢迎语
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
                    userId: userId1,
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
            url: 'http://120.79.232.81:9000/InvitationVO/personalPage',
            dataType: 'json',
            data: {
                userId: userId1,
                targetId: userId
            },
            success: function (result) {
                if(result.code==200){
                    var data = result.data

                    document.getElementById('email').innerHTML = data.Personal.email;
                    document.getElementById('userName').innerHTML = data.Personal.userName;
                    document.getElementById('remarks').innerHTML = data.Personal.remarks;
                    document.getElementById('image').src = data.Personal.imgAddress;
                    document.getElementById('attent').innerHTML = '关注：' + data.MyAttentionNum;
                    document.getElementById('fans').innerHTML = '粉丝：' + data.MyFansNum;

                    
                //我的历史帖子列表   
                    for (i in data.MyInvitationList) {
                        var button;
                        if(data.MyInvitationList[i].imgUrl != null && data.MyInvitationList[i].imgUrl != ''){
                            button = 
                                '<div>' + 
                                    '<div style="display: flex;flex-wrap: nowrap;">' + 
                                    '<img src="'+data.MyInvitationList[i].imgUrl+'" style="margin:10px 6px 0 0;height:60px;width:100px;">' +
                                        '<div>' + 
                                            '<div style="font-weight:600;padding:6px 0;">' + data.MyInvitationList[i].title + '</div>' + 
                                            '<div>' + data.MyInvitationList[i].introduce + '</div>' + 
                                        '</div>' +
                                    '</div>' +
                                    '<div style="padding:20px 0 10px;display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                        '<span>' + '评论：' +'<span>' + data.MyInvitationList[i].commentNum + '</span>' + '</span>' +
                                        '<span>' + '浏览：' +'<span>' + data.MyInvitationList[i].pageView + '</span>' + '</span>' +
                                        '<span>' + '楼主：' +'<span>' + data.MyInvitationList[i].userName + '</span>' + '</span>' +
                                        '<span>' + '时间：' +'<span>' + data.MyInvitationList[i].createTime + '</span>' + '</span>' + 
                                    '</div>' +
                                '</div>';
                        }else{
                            button = 
                            '<div>' + 
                                '<div style="display: flex;flex-wrap: nowrap;">' + 
                                    '<div>' + 
                                        '<div style="font-weight:600;padding:6px 0;">' + data.MyInvitationList[i].title + '</div>' + 
                                        '<div>' + data.MyInvitationList[i].introduce + '</div>' + 
                                    '</div>' +
                                '</div>' +
                                '<div style="padding:20px 0 10px;display: flex;flex-wrap: nowrap;justify-content: space-between;">' + 
                                    '<span>' + '评论：' +'<span>' + data.MyInvitationList[i].commentNum + '</span>' + '</span>' +
                                    '<span>' + '浏览：' +'<span>' + data.MyInvitationList[i].pageView + '</span>' + '</span>' +
                                    '<span>' + '楼主：' +'<span>' + data.MyInvitationList[i].userName + '</span>' + '</span>' +
                                    '<span>' + '时间：' +'<span>' + data.MyInvitationList[i].createTime + '</span>' + '</span>' + 
                                '</div>' +
                            '</div>';
                        }
                        $("#recommend").append('<button type="button" class="list-group-item" style="outline:none;" onclick="openContents(' + data.MyInvitationList[i].invitationId + ')">' + button + '</button>');
                    }
                }
                //判断是否是本人个人主页
                if(userId == userId1){
                    var btnUp = document.getElementById("btnUp");
                    var btnAttention = document.getElementById("btnAttention");
                    var btnReport = document.getElementById("btnReport");
                    btnUp.style.display = 'block';//显示设置按钮
                    btnAttention.style.display = 'none';//隐藏关注按钮
                    btnReport.style.display = 'none';//隐藏举报按钮
                }
                else{
                    var btnUp = document.getElementById("btnUp");
                    var btnAttention = document.getElementById("btnAttention");
                    btnUp.style.display = 'none';
                    if(!data.attention){
                        btnAttention.style.display = 'block';
                    }else{
                        btnAttention.innerText = '已关注';
                    }
                }
            }
        });
    });



//帖子详情跳转
function openContents(e) {
    window.open('concrete.html?invitationId=' + e + '','_blank');//打开页面并传递invitationId
}

//关注或取消
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
                    var btnAttention = document.getElementById("btnAttention").innerText;
                    if(btnAttention == '已关注'){
                        $.ajax({
                            type:'post',
                            url:'http://120.79.232.81:9000/attention/deleteAttentionInfo',
                            dataType:'json',
                            data:{
                                userId: userId1,
                                targetId: userId
                            },
                            success:function (result) {
                                if(result.code == 200){
                                    alert("取消关注成功！");
                                    location.reload(true);
                                }else{
                                    alert(result.message);
                                }
                            }
                        });
                    }else{
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
                            url:'http://120.79.232.81:9000/Accuse/addAccuseUserInfo',
                            dataType:'json',
                            data:{
                                userId: userId1,
                                targetId: userId,
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

//设置
function upDate(){
    var up = document.getElementById("up");
    var on = document.getElementById("on");
    up.style.display = "none";
    on.style.display = "block";
    document.getElementById('imageChange').src = document.getElementById('image').src;
    document.getElementById('userNameChange').value = document.getElementById('userName').innerText;
    document.getElementById('remarksChange').value = document.getElementById('remarks').innerText;
    document.getElementById('emailChange').value = document.getElementById('email').innerText;
}
//取消
function onClose(){
    var up = document.getElementById("up");
    var on = document.getElementById("on");
    var btnPwd1 = document.getElementById("btnPwd1");
    var btnPwd2 = document.getElementById("btnPwd2");   
    on.style.display = "none";
    up.style.display = "block";
    btnPwd1.style.visibility = "visible";
    btnPwd2.style.visibility = "hidden";
}

//修改密码
function pwd(){
    var btnPwd1 = document.getElementById("btnPwd1");
    var btnPwd2 = document.getElementById("btnPwd2");
    btnPwd1.style.visibility = "hidden";
    btnPwd2.style.visibility = "visible";
}

//确定
function define(){
    var url=window.location.search; //获取url中"?"符后的字串  
    if(url.indexOf("?")!=-1){
        var userId = url.substr(url.indexOf("=")+1);
    }
    var image = document.getElementById('input_file').files[0];
    var userNameChange = document.getElementById('userNameChange').value
    var remarksChange = document.getElementById('remarksChange').value
    var emailChange = document.getElementById('emailChange').value
    var password = document.getElementById('password').value

    var formData = new FormData;
    formData.append('userId',userId);
    formData.append('userName',userNameChange);
    formData.append('remarks',remarksChange);
    formData.append('email',emailChange);
    formData.append('password',password);
    formData.append('file',image);//将图片塞进formData

    console.log(formData.get('file'));

    if(image == undefined){
        if(password == ''){
            $.ajax({
                type:'post',
                url:'http://120.79.232.81:9000/user/modifyPersonalInformationNotImg',
                dataType:'json',
                data:formData,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,   // jQuery不要去设置Content-Type请求头
                success:function (result) {
                    if(result.code == 200){
                        var up = document.getElementById("up");
                        var on = document.getElementById("on");
                        var btnPwd1 = document.getElementById("btnPwd1");
                        var btnPwd2 = document.getElementById("btnPwd2");   
                        on.style.display = "none";
                        up.style.display = "block";
                        btnPwd1.style.visibility = "visible";
                        btnPwd2.style.visibility = "hidden";
        
                        location.reload(true);
                    }else{
                        alert(result.message);
                    }
                }
            });
        }else{
            $.ajax({
                type:'post',
                url:'http://120.79.232.81:9000/user/modifyPersonalInformationNotImg',
                dataType:'json',
                data:formData,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,   // jQuery不要去设置Content-Type请求头
                success:function (result) {
                    if(result.code == 200){
                        sessionStorage.clear();
                        console.log(sessionStorage.getItem('userId'));
                        alert('修改密码需重新登陆！');
                        window.open('../login.html','_self');
                    }else{
                        alert(result.message);
                    }
                }
            });
        }
    }else{
        if(password == ''){
            $.ajax({
                type:'post',
                url:'http://120.79.232.81:9000/user/modifyPersonalInformation',
                dataType:'json',
                data:formData,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,   // jQuery不要去设置Content-Type请求头
                success:function (result) {
                    if(result.code == 200){
                        var up = document.getElementById("up");
                        var on = document.getElementById("on");
                        var btnPwd1 = document.getElementById("btnPwd1");
                        var btnPwd2 = document.getElementById("btnPwd2");   
                        on.style.display = "none";
                        up.style.display = "block";
                        btnPwd1.style.visibility = "visible";
                        btnPwd2.style.visibility = "hidden";
        
                        location.reload(true);
                    }else{
                        alert(result.message);
                    }
                }
            });
        }else{
            $.ajax({
                type:'post',
                url:'http://120.79.232.81:9000/user/modifyPersonalInformation',
                dataType:'json',
                data:formData,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,   // jQuery不要去设置Content-Type请求头
                success:function (result) {
                    if(result.code == 200){
                        sessionStorage.clear();
                        alert('修改密码需重新登陆！');
                        window.open('../login.html','_self');
                    }else{
                        alert(result.message);
                    }
                }
            });
        }    

    }
    
}

//判断密码是否相同
function toPass() {
    var password = document.getElementById("password").value;
    var password1 = document.getElementById("password1").value;
    if(password != password1){
        document.getElementById("tishi").innerHTML="两次密码不相同！";
        document.getElementById("submit").setAttribute("disabled", true);
        document.getElementById("submit").style.color  = '#555555';
        document.getElementById("submit").style.borderColor  = '#555555';
    }
    else{
        document.getElementById("tishi").innerHTML="";
        document.getElementById("submit").removeAttribute("disabled");
        document.getElementById("submit").style.color  = '#5D9CEC';
        document.getElementById("submit").style.borderColor  = '#5D9CEC';
    }
}

function imgPreview(fileDom,i) {
    //判断是否支持FileReader
    if(window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }
    //获取文件
    var file = fileDom.files[0];
    var imageType = /^image\//;
    
    if(!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    //读取完成
    reader.onload = function(e) {
        //图片路径设置为读取的图片
        // img.src = e.target.result;
        document.getElementById('imageChange').src = e.target.result;//上传预览
        //console.log('reader',reader)
    };
    reader.readAsDataURL(file);
    return reader.result;
}
