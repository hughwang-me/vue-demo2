const TodoItem = {
    props: ['todo'],
    template: `
      <li>{{ todo.text }}</li>`
}


const Counter = {
    data() {
        return {
            counter: 0,
            message: 'You loaded this page on ' + new Date().toLocaleString(),
            dynamicId: "dynamicId",
            isButtonDisabled: true,
            clickShowInfo: '点击初始信息',
            modelInfo: 'Model初始信息',
            question:'',
            answer:'',
            a: 0,
            b: 0,
            seen: true,
            todos: [
                {text: 'Learn JavaScript'},
                {text: 'Learn Vue'},
                {text: 'Build something awesome'}
            ],
            groceryList: [
                {id: 0, text: 'Vegetables'},
                {id: 1, text: 'Cheese'},
                {id: 2, text: 'Whatever else humans are supposed to eat'}
            ],
            rawHtml: '<span style="color: red">This should be red.</span>'
        }
    },
    components: {
        TodoItem
    },
    watch: {
        question(newQuestion, oldQuestion) {
            console.log('question -> new : ' + newQuestion + '  old : ' + oldQuestion)
            if (newQuestion.indexOf('?') > -1) {
                this.getAnswer()
            }
        }
    },
    computed:{
        computedResult(){
            return this.a + this.b
        }
    },
    mounted() {
        setInterval(() => {
            this.counter++
        }, 1000)
    },
    methods: {
        reverseMessage() {
            this.seen = !this.seen;
            this.clickShowInfo = this.clickShowInfo
                .split('')
                .reverse()
                .join('')
        },
        getAnswer() {
            this.answer = 'Thinking...'
            axios
                .get('http://localhost:8090/book')
                .then(response => {
                    console.log('resp:' + JSON.stringify(response))
                    this.answer = response.data
                })
                .catch(error => {
                    this.answer = 'Error! Could not reach the API. ' + error
                })
        }
    }
}

Vue.createApp(Counter).mount('#root')
