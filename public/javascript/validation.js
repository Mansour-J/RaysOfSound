$(document).ready(function () {
    function validate(id) {
        $("#" + id).addClass("error");
        $("#" + id).removeClass("correct");
        $("#" + id).parent().find("p").eq(0).removeClass("display");
        $("#" + id).parent().find("p").eq(1).addClass("display");
        $("#" + id).parent().find(".test").removeClass("baste");
        $("#" + id).parent().find(".ok").addClass("baste");

    }

    function validate1(id) {
        $("#" + id).removeClass("error");
        $("#" + id).addClass("correct");
        $("#" + id).parent().find("p").eq(1).addClass("display");
        $("#" + id).parent().find("p").eq(0).addClass("display");
        $("#" + id).parent().find(".ok").removeClass("baste");
        $("#" + id).parent().find(".test").addClass("baste");

    }

    function isValidEmail(emailText) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailText);
    };

    function isValidName(name) {
        var pattern = new RegExp(/^[a-z]+$/i);
        return pattern.test(name);
    };

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);

    }

    function generateCaptcha() {
        var random1 = randomNumber(1, 100);
        var random2 = randomNumber(1, 200);
        var sum = random1 + random2;
        $('#captchaOperation').html(random1 + " + " + random2 + " = ");
        $("#answer").keyup(function () {
            if ($("#answer").val() == sum) {
                $("#answer").removeClass("error");
                $("#answer").addClass("correct");
                $("#register1").removeAttr('disabled');
                $("#answer").parent().find("p").addClass("display");
                $("#answer").parent().find(".ok").removeClass("baste");
                $("#answer").parent().find(".test").addClass("baste");
            } else if ($("#answer").val() != sum) {
                $("#answer").addClass("error");
                $("#answer").removeClass("correct");
                $("#answer").parent().find("p").removeClass("display");
                $("#answer").parent().find(".test").removeClass("baste");
                $("#answer").parent().find(".ok").addClass("baste");
                $("#register1").attr('disabled', 'disabled');
            }
        });
    }
    generateCaptcha();

    $("#email").keyup(function () {

        if (!$(this).val()) {
            validate("email");
            $("#register1").attr('disabled', 'disabled');
        } else if (!isValidEmail($("#email").val())) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find(".test").removeClass("baste");
            $(this).parent().find(".ok").addClass("baste");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("email");
            $("#register1").removeAttr('disabled');
        }
    });

    $("#pass").keyup(function () {
        if (!$(this).val()) {
            validate("pass");
            $("#register1").attr('disabled', 'disabled');
        } else if ($(this).val().length < 8) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find(".test").removeClass("baste");
            $(this).parent().find(".ok").addClass("baste");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("pass");
            $("#register1").removeAttr('disabled');
        }
    });
    $("#confirm").keyup(function () {
        if (!$(this).val()) {
            validate("confirm");
            $("#register1").attr('disabled', 'disabled');
        } else if ($("#pass").val() != $("#confirm").val()) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find(".test").removeClass("baste");
            $(this).parent().find(".ok").addClass("baste");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("confirm");
            $("#register1").removeAttr('disabled');
        }

    });
    $("#name1").keyup(function () {

        if (!$(this).val()) {
            validate("name1");
            $("#register1").attr('disabled', 'disabled');
        } else if (!isValidName($("#name1").val())) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find(".test").removeClass("baste");
            $(this).parent().find(".ok").addClass("baste");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("name1");
            $("#register1").removeAttr('disabled');
        }
    });
    $("#last").keyup(function () {

        if (!$(this).val()) {
            validate("last");
            $("#register1").attr('disabled', 'disabled');
        } else if (!isValidName($("#last").val())) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find(".test").removeClass("baste");
            $(this).parent().find(".ok").addClass("baste");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("last");
            $("#register1").removeAttr('disabled');
        }
    });
    $("#language").keyup(function () {

        if (!$(this).val()) {
            validate("language");
            $("#register1").attr('disabled', 'disabled');
        } else if (!isValidName($("#language").val())) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find(".test").removeClass("display");
            $(this).parent().find(".ok").addClass("display");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("language");
            $("#register1").removeAttr('disabled');
        }
    });
    $("#age").keyup(function () {
        function isValidDate(date) {
            var pattern = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
            return pattern.test(date);
        }
        if (!$(this).val()) {
            validate("age");
            $("#register1").attr('disabled', 'disabled');
        } else if (!isValidDate($("#age").val())) {
            $(this).addClass("error");
            $(this).removeClass("correct");
            $(this).parent().find("p").eq(1).removeClass("display");
            $(this).parent().find("p").eq(0).addClass("display");
            $(this).parent().find(".test").removeClass("baste");
            $(this).parent().find(".ok").addClass("baste");
            $("#register1").attr('disabled', 'disabled');
        } else {
            validate1("age");
            $("#register1").removeAttr('disabled');
        }
    });
    $("#registrationForm").submit(function (event) {
        $(this).find("input").each(function (i) {
            if (!$(this).val()) {
                $(this).addClass("error");
                $(this).removeClass("correct");
                $(this).parent().find("p").eq(0).removeClass("display");
                $(this).parent().find(".test").removeClass("baste");
                $(this).parent().find(".ok").addClass("baste");
                $("#register1").attr('disabled', 'disabled');
                event.preventDefault();
            } else if ($(this).val()) {
                $(this).removeClass("error");
                $(this).addClass("correct");
                $(this).parent().find("p").eq(0).addClass("display");
                $(this).parent().find(".ok").removeClass("baste");
                $(this).parent().find(".test").addClass("baste");
            }
        });
    });



});