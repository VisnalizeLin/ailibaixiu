$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();



    // 为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        // 如果用户输入了内容，则将内容追加到页面上显示
        $('.talk_list').append('<li class="right_word"><img src="images/person02.png"><span>' + text + '</span></li>');
        $('#ipt').val('');

        // 追加完成后，重置滚动条位置
        resetui();
        // 发起请求，获取聊天内容
        getMsg(text);

    });
    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: { spoken: text },
            success: function (res) {
                if (res.message === 'success') {
                    console.log(res);
                    // 接收聊天消息
                    var msg = res.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="images/person01.png" /> <span>' + msg + '</span></li>');
                    resetui();

                    // 获取语音
                    getVoice(msg);
                }
            }
        })
    }

    // 获取机器人聊天语音
    function getVoice(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: { text: text },
            success: function (res) {
                console.log(res);
                if (res.status === 200) {
                    // 如果请求成功，则 res.voiceUrl 是服务器 返回的音频url地址
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        })
    }

    // 键盘enter 操作
    $('#ipt').on('keyup', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            $('#btnSend').click();
        };
    })


})