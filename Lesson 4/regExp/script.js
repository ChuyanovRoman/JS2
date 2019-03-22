const q = new Vue({
    el: '#q',
    data: {
        message: 'Введите текст',
        outMessage: '',
    },
    methods: {
        replaceQuotes: function () {
            console.log(this.message);
            let r = new RegExp("(\\s'\\S|\\S'\\s)", "g");
            this.outMessage = this.message.replace(r, function (str) {
                return str.replace("'", "\"")
            })
        }
    }
});