$(function () {
    //修改个人信息
    $('#updateUserNameButton').click(function () {
        $("#updateUserNameButton").attr("disabled",true);
        var userName = $('#loginUserName').val();
        var nickName = $('#nickName').val();
        if (validUserNameForUpdate(userName, nickName)) {
            var params = $("#userNameForm").serialize();
            $.ajax({
                type: "POST",
                url: "/admin/profile/name",
                data: params,
                success: function (r) {
                    if (r == 'success') {
                        alert('Edit success');
                    } else {
                        alert('Edit failed');
                        $("#updateUserNameButton").prop("disabled",false);
                    }
                }
            });
        } else {
            $("#updateUserNameButton").prop("disabled",false);
        }
    });
    //修改密码
    $('#updatePasswordButton').click(function () {
        $("#updatePasswordButton").attr("disabled",true);
        var originalPassword = $('#originalPassword').val();
        var newPassword = $('#newPassword').val();
        if (validPasswordForUpdate(originalPassword, newPassword)) {
            var params = $("#userPasswordForm").serialize();
            $.ajax({
                type: "POST",
                url: "/admin/profile/password",
                data: params,
                success: function (r) {
                    console.log(r);
                    if (r == 'success') {
                        alert('Edit success');
                        window.location.href = '/admin/login';
                    } else {
                        alert('Edit failed');
                        $("#updatePasswordButton").attr("disabled",false);
                    }
                }
            });
        } else {
            $("#updatePasswordButton").attr("disabled",false);
        }
    });
})

/**
 * Name check
 */
function validUserNameForUpdate(userName, nickName) {
    if (isNull(userName) || userName.trim().length < 1) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Pls input login！");
        return false;
    }
    if (isNull(nickName) || nickName.trim().length < 1) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Nickname cannot be empty！");
        return false;
    }
    if (!validUserName(userName)) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Pls check format！");
        return false;
    }
    if (!validCN_ENString2_18(nickName)) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Pls check format！");
        return false;
    }
    return true;
}

/**
 * Password check
 */
function validPasswordForUpdate(originalPassword, newPassword) {
    if (isNull(originalPassword) || originalPassword.trim().length < 1) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("Pls input original password！");
        return false;
    }
    if (isNull(newPassword) || newPassword.trim().length < 1) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("New password cannot be empty！");
        return false;
    }
    if (!validPassword(newPassword)) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("Pls check format！");
        return false;
    }
    return true;
}
