<template>
  <section class="hello">
    <b-container>
      <h1>Socket</h1>
      <b-row>
        <b-col cols="6">
          <b-card v-for="item in comments">
            <p class="card-text">id: {{item.id}}: {{item.text}}</p>
            <b-button @click="sendMessage(item.id)" variant="danger">Удалить</b-button>
          </b-card>
        </b-col>
        <b-col cols="6">
          <b-row>
            <b-col sm="4"><label for="input-small">Желаемый таймаут:</label></b-col>
            <b-col sm="4">
                <b-form-input id="input-small" size="sm" v-model="timeout" type="text"></b-form-input>
            </b-col>
            <b-form-textarea :rows="10" :max-rows="10" v-model="console">
            </b-form-textarea>
            <b-btn @click="showArray" variant="danger">Показать</b-btn>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://echo.websocket.org/', { 
  reconnection: true, 
  reconnectionAttempts: 5,
  reconnectionDelay: 3000
})
export default {
  name: 'Socket',
  data () {
    return {
      comments: [
        { id: 1, text: "Тестовый коммент 1"},
        { id: 2, text: "Это шедевр"},
        { id: 3, text: "Это прекрасно"},
        { id: 4, text: "Лучшее, что я видел"},
        { id: 5, text: "Два чая этому автору"}
      ],
      console: "",
      commentsForDel: [

      ],
      timeout: 60000
    }
  },
  methods: {
    sendMessage(id){
      this.console += "Запрос на удаление коммента с id = " + id + "\n";
      this.$socket.send(id);
      this.commentsForDel.push({
        timerId: setTimeout(()=>{
          this.console += "Превышено время ожидание ответа на запрос на удаление коммента с id = " + id + "\n";
          this.console += "Коммент с id = " + id + " не будет удален\n";
          this.commentsForDel = this.commentsForDel.filter(item => {
              return id != item.id;
          });
        }, this.timeout),
        id: id
      });
    },
    showArray(){
      console.log(this.commentsForDel);
    }
  },
  created(){
    this.$options.sockets.onmessage = ({data}) => {
      const index = this.comments.findIndex(({id}) => {
        return id == data;
      });
      console.log("Index: ", index);
      if(index != -1){
        this.console += "Запрос на удаление коммента с id = " + data + " одобрен\n";
        this.comments.splice(index, 1);
        this.console += "Коммент с id = " + data + " удален\n";
        const indexOfDel = this.commentsForDel.findIndex(({id}) => {
          return id == data;
        });
        if(indexOfDel != -1){
          console.log(this.commentsForDel);
          clearTimeout(this.commentsForDel[indexOfDel].timerId);
          this.console += "Интервал очищен\n";
          this.commentsForDel.splice(indexOfDel, 1);
        }
      }
    };
    this.$options.sockets.onerror = (data) => {
      this.console += "Ошибка работы с сокетом\n";          
    };
    this.$options.sockets.onclose = (data) => {
      this.console += "Соединение с сокетом было закрыто\n";          
    }
  }
}
</script>

<style scoped>
.card{
  margin-top: 12px;
}
textarea{
  margin: 12px 0;
  font-family: 'Courier New';
  font-size: 12px;
}
</style>
