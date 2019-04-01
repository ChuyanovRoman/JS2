const contact = new Vue({
    el: '#contact',
    data: {
        nameStyle: {},
        phoneStyle: {},
        emailStyle: {},
        name: {
            data: '',
            style: {},
            check: false,
        },
        phone: {
            data: '',
            style: {},
            check: false,
        },
        email: {
            data: '',
            style: {},
            check: false,
        },
        text: '',
    },
    methods: {
        send: function () {
            if (this.name.check && this.phone.check && this.email.check) {
                alert('Отправлено');
            } else {
                alert('Ошибка');
            }
        },
        checkName: function () {
            check(/^[а-яА-Яa-zA-Z]+$/, this.name);
        },
        checkPhone: function () {
            check(/^\+7\d{3}\d{3}\d{4}$/, this.phone);
        },
        checkEmail: function () {
            check(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, this.email);
        },
    }
});

function check(regexp, prop) {
    if (regexp.test(prop.data)) {
        prop.style = {
            background: 'grey',
        };
        prop.check = true;
    } else {
        prop.style = {
            background: 'red',
        };
        prop.check = false;
    }
}