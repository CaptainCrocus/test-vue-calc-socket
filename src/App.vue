<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-button v-bind:to="{ name: 'Calc' }" variant="primary">Калькулятор</b-button>
          <b-button v-bind:to="{ name: 'Socket' }" variant="success">Сокет</b-button>
        </b-col>
      </b-row>
    </b-container>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  margin: 36px 0 24px;
}
.num{
  margin-bottom: 6px;
}
.denum{
  margin-top: 6px;
}
.clearfix{
  background-color: #ababab;
  width: 100%;
  height: 2px;
}
</style>
