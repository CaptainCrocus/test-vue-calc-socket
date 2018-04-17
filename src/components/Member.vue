<template>
    <b-row class="align-items-center">
      <b-col sm="6">
        <b-form-input type="text" v-on:input="sendMessage" v-model="operator"></b-form-input>
      </b-col>
      <b-col sm="6">
        <b-form-input class="num" type="text" v-on:input="sendMessage" v-model="numerator"></b-form-input>
        <div class="clearfix"></div>
        <b-form-input class="denum" type="text" v-on:input="sendMessage" v-model="denumerator"></b-form-input>
      </b-col>
    </b-row>
</template>

<script>
export default {
  name: 'Member',
  data () {
    return {
      ind: this.index,
      numerator: this.num,
      denumerator: this.denum,
      operator: this.op,
      prevOp: this.op
    }
  },
  props: [ 'index', 'num', 'denum', 'op'],
  computed:{
  },
  methods:{
    sendMessage(){
      if(!/^[+-/*//]$/.test(this.operator)){
        this.$emit('error', { message: {index: this.ind, alert: 'Исправьте оператор'}});
        return;
      }
      if(!/^\d+$/.test(this.numerator)){
        this.$emit('error', { message: {index: this.ind, alert: 'Исправьте числитель'}});
        return;
      }
      if(!/^[1-9]+[0]*$/.test(this.denumerator)){
        this.$emit('error', { message: {index: this.ind, alert: 'Исправьте знаменатель'}});
        return;
      }
      this.prevOp = this.operator;
      this.$emit('changeresult', { 
        message: {
          index: this.ind,
          num: parseInt(this.numerator),
          denum: parseInt(this.denumerator),
          op: this.operator
        }
      })
    }
  },
  created(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
