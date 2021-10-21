$(function () {
    $(".reg").hide()
    $("#link_reg").on('click', function () {
        $(".reg").hide()
        $(".login").show()
    })

    $("#link_login").on('click', function () {
        $(".login").hide()
        $(".reg").show()

    })

})

var form = layui.form
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须为6到12位，并且不能出现空格'],

    repwd: function (value) {
        var pwd = $(".reg [name=password]").val()
        if (pwd != value) {
            return "两次输入的密码不一致"
        }
    }
})


$("#form-reg").on("submit", function (e) {
    e.preventDefault()
    $.post('/api/reguser', {
        username: $(".reg [name=username]").val(), password: $(".reg [name=password]").val()
    }, function (res) {
        if (res.status !== 0) {
            return layer.msg(res.massage)
        }
        layer.msg("注册成功")
        $('#link_reg').click()
    })
})

  // 监听登录表单的提交事件
  $('#form-login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        location.href='/index.html'
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
    }

    })
})
