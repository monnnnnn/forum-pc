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
});

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
  
  //封面图预览
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
    //是否是图片
    if(!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    //读取完成
    reader.onload = function(e) {
        //图片路径设置为读取的图片
        // img.src = e.target.result;
        document.getElementsByClassName('file-box')[i].style.background = "url("+e.target.result+")no-repeat";//回显图片
        document.getElementsByClassName('file-box')[i].style.backgroundSize = '200px 120px';
        
        //console.log('reader',reader)
    };
    reader.readAsDataURL(file);
    return reader.result;
}

