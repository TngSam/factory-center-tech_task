<template>
    <div class="wrapper">
        <div class="question" v-if="question">
            <Header>
                <h2>&laquo;{{ question.title }}&raquo;</h2>
                <router-link to="/"><span>←</span> к списку вопросов</router-link>
            </Header>

            <main>
                <h3>Ответы</h3>

                <div class="table">
                    <div class="table-header">
                        <div>Текст</div>
                        <div>Частота</div>
                    </div>
                    <ul class="table-body">
                        <li v-for="(answer, index) in question.answers" :key="index">
                            <div>{{ answer.answer }}</div>
                            <div>{{ answer.number }}</div>
                        </li>
                    </ul>
                </div>
            </main>
        </div>

        <div class="question" v-else>
            <Header>
                <h2>Создать вопрос</h2>
                <router-link to="/"><span>←</span> к списку вопросов</router-link>
            </Header>

            <main>
                <template v-if="!identifier">
                    <form action="POST">
                        <label for="text">Текст вопроса</label>
                        <input
                            type="text"
                            name="text"
                            v-model="questionName"
                            :class="error.is && 'error-input'"
                        />
                        <div v-if="error.is" class="error-message">{{ error.message }}</div>

                        <button @click.prevent="createQuestion">Создать</button>
                    </form>
                </template>
                <div v-else>{{ identifier }}</div>
            </main>
        </div>
    </div>
</template>

<script>
import { CREATE_QUESTION } from '@/store/names'

import Header from '@/components/Header'

export default {
    name: 'question',
    components: {
        Header
    },
    data: () => ({
        question: undefined,
        questionName: '',

        error: {
            is: false,
            message: ''
        },
        identifier: undefined
    }),

    methods: {
        async createQuestion() {
            try {
                const data = await this.$store.dispatch(CREATE_QUESTION, {
                    title: this.questionName
                })
                this.identifier = data.uri.substr(data.uri.length - 5)
            } catch (error) {
                this.error = {
                    is: true,
                    message: error.message
                }
            }
        }
    },

    created() {
        if (this.$route.params.index) {
            this.question = this.$store.state.questions[this.$route.params.index]
        }
    }
}
</script>

<style scoped lang="scss">
    .wrapper {
        min-height: 90.5vh;

        main {
            h3, .table .table-header {
                color: #AFAFAF;
            }

            .table {
                margin-top: .5rem;
                max-width: 25%;
                .table-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    font-size: .9rem;

                    margin-bottom: .5rem;
                }

                ul.table-body {
                    li {
                        font-size: .9rem;
                        &:not(:last-child) {
                            margin-bottom: .5rem;
                        }
                        div {
                            width: 50%;
                            &:last-child {
                                text-align: right;
                            }
                        }
                    }
                }
            }

            // Create question form

            form {
                label {
                    font-size: .75rem;
                    color: #1F8C8D;
                }
                input {
                    width: 32.5%;
                    display: block;
                    background: none;
                    outline: none;
                    border: none;

                    margin-top: .25rem;
                    padding-bottom: .25rem;
                    border-bottom: 1px solid #1F8C8D;
                    font-size: 1.25rem;

                    &.error-input {
                        border-color: red;
                    }
                }
                .error-message {
                    font-size: .675rem;
                    margin-top: .25rem;
                    color: red;
                }
                button {
                    margin-top: 3.75rem;
                }
            }
        }
    }
</style>
