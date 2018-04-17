<template>
    <b-row class="align-items-center">
      <b-col sm="12">
        <b-form-input class="num" type="text" v-on:input="sendMessage" v-model="numerator"></b-form-input>
        <div class="clearfix"></div>        
        <b-form-input class="denum" type="text" v-on:input="sendMessage" v-model="denumerator"></b-form-input>
      </b-col>
    </b-row>
</template>

<script>
export default {
  name: 'FstMember',
  data () {
    return {
      numerator: this.num,
      denumerator: this.denum
    }
  },
  props: [ 'num', 'denum'],
  computed:{
    result(){
      return parseInt(this.num) / parseInt(this.denum);
    }
  },
  methods:{
    sendMessage(){
      if(!/^\d+$/.test(this.numerator)){
        this.$emit('error', { message: {index: 0, alert: 'Исправьте числитель'}});
        return;
      }
      if(!/^[1-9]+[0]*$/.test(this.denumerator)){
        this.$emit('error', { message: {index: 0, alert: 'Исправьте знаменатель'}});
        return;
      }

      this.$emit('changeresult', { 
          message: {
            index: 0,
            num: parseInt(this.numerator),
            denum: parseInt(this.denumerator)
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
