<template>
    <div class="container">
        <div class="box has-background-info-light">
            <div class="title">
                <h1 class="is-size-4 has-text-weight-bold">Табло</h1>
            </div>

            <div v-if="$store.state.user">
                <div class="field">
                    <label>Нова обява</label>
                    <div class="control">
                        <input type="text" class="input" v-model="content">
                    </div>
                </div>

                <div class="columns">
                    <div class="field column">
                        <label>Автор</label>
                        <div class="control">
                            <input type="text" class="input" v-model="author">
                        </div>
                    </div>

                    <div class="field column has-text-right">
                        <div @click="addNote" class="button is-info has-text-right mt-5">
                            Публикувай
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="notes[0]" class="box has-background-info-light">
            <div v-for="note in notes" v-bind:key="note.objectId">
                <div class="box columns m-3">
                    <div class="title column is-four-fifths">
                        <h1>{{ note.content }}</h1>
                    </div>

                    <div class="column is-one-fifths">
                        <div class="has-text-right">
                            <p>{{ note.createdAt.split('T')[0]}}</p>
                        </div>

                        <div class="has-text-right">
                            <p>{{ note.author }}</p>
                        </div>

                        <div v-if="$store.state.user" class="has-text-right mt-2">
                            <div @click="dellNote(note.objectId)" class="button is-small is-danger is-light">Изтрий</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="box has-background-info-light">
                <div class="title m-6 has-text-centered">
                    <h1>Няма актуални обяви</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import toastData from '../helpers/ToastData'


export default {
    name: 'Dashboard',
    data() {
      return {
          notes: [],
          content: '',
          author: '',
      }
    },
    mounted() {
        this.getAll()
    },
    methods: {
        async getAll() {
            this.$store.commit('setLoading', true)

            try {
                const res = await axios.get('/classes/posts?order=-createdAt')
                this.notes = res.data.results
            }
            catch(err) {
                alert(err.message);
            }

            this.$store.commit('setLoading', false)
        },
        async addNote() {
            if (this.content != '' && this.author != '') {
                const data = {
                    content: this.content,
                    author: this.author
                }
                this.$store.commit('setLoading', true)

                await axios
                    .post('/classes/posts/', data)
                    .then(response => {
                        toastData.message = 'Успешно публикуване.'
                        toastData.type = 'is-success'
                        toast(toastData)

                        const newNote = {
                            content: this.content,
                            author: this.author,
                            objectId: response.data.objectId,
                            createdAt: response.data.createdAt
                        }
                        this.notes.unshift(newNote)
                        this.content = ''
                        this.author = ''
                    })
                    .catch(error => {
                        console.log(error)
                        toastData.message = 'Неуспешно публикуване!'
                        toastData.type = 'is-danger'
                        toast(toastData)
                    })
                this.$store.commit('setLoading', false)
            }else {
                toastData.message = 'Попълни полетата!'
                toastData.type = 'is-danger'
                toast(toastData)
            }
        },
        async dellNote(id) {
            this.$store.commit('setLoading', true)

            await axios
                .delete('/classes/posts/'+ id)
                .then(response => {
                    this.notes = this.notes.filter(n => n.objectId != id)
                    toastData.message = 'Успешно изтрито.'
                    toastData.type = 'is-warning'
                    toast(toastData)
                })
                .catch(error => {
                    console.log(error)
                    toastData.message = 'Неуспешно изтриване!'
                    toastData.type = 'is-danger'
                    toast(toastData)
                })

            this.$store.commit('setLoading', false)
            
        }
    }
}
</script>

<style>

</style>