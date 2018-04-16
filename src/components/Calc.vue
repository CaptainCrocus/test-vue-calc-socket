<template>
  <section class="hello">
    <b-container>
      <h1>Калькулятор</h1>
      <b-row>
        <b-col cols="12">
            <b-alert variant="danger" :show="errors.length !== 0">
              <div v-for="item in errors">
                Для члена выражения #{{item.index + 1}}: - {{item.alert}}
              </div>
            </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="1">
          <fstmember v-on:changeresult="changeFstMember" v-on:error="showError" :num="fstMember.num" :denum="fstMember.denum"></fstmember>
        </b-col>
        <b-col sm="2" v-for="item in members">
          <member v-on:changeresult="changeMember" v-on:error="showError" :index="item.index" :num="item.num" :denum="item.denum" :op="item.op"></member>
        </b-col>
        <b-col sm="3">
        <b-row class="align-items-center">
          <b-col sm="2">=</b-col>
          <b-col sm="2">{{sign}}</b-col>
          <b-col sm="8">
            <b-form-input class="num" disabled type="text" v-model="numerator"></b-form-input>
            <div class="clearfix"></div>
            <b-form-input class="denum" disabled type="text" v-model="denumerator"></b-form-input>
          </b-col>
        </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols=1 class="mt-4">
          <b-btn variant="primary" v-on:click="addFraction">Add fraction</b-btn>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import Member from '@/components/Member'
import FstMember from '@/components/FstMember'
import Fractional from 'fractional'
import math from 'mathjs'

export default {
  name: 'Calc',
  data () {
    return {
      numerator: 1,
      denumerator: 1,
      sign: '',
      fstMember: { num: 1, denum: 1 },
      errors: [],
      members: [
        {index: 1, num: 1, denum: 1, op: '+'}
      ]
    }
  },
  components: {
    'member' : Member,
    'fstmember': FstMember 
  },
  methods: {
    addFraction(){
      this.members.push({
        index: this.members.length + 1, 
        num: 1, 
        denum: 1, 
        op: '+'
      });
      this.calculate();
    },
    changeMember(evt){
      this.members.forEach((item, i, arr)=>{
        if(item.index === evt.message.index){
          arr[i] = evt.message;
        }
      });
      this.errors = this.errors.filter((item)=>{
        return item.index !== evt.message.index;
      });
      this.calculate();
    },
    changeFstMember(evt){
      this.fstMember = evt.message;
      this.errors = this.errors.filter((item)=>{
        return item.index !== evt.message.index;
      });
      this.calculate();
    },
    calculate(){
      let result = this.fstMember.num / this.fstMember.denum;
      for(let i = 0; i < this.members.length; i++){
        result += this.members[i].op + (this.members[i].num / this.members[i].denum);
      }
      console.log("String: ", result);
      // console.log("Math String: ", math.eval(result));
      result = math.fraction(math.eval(result));
      // console.log("Math fraction: ", result);
      this.numerator = result.n;
      this.denumerator = result.d;
      this.sign = (result.s === 1) ? '' :  '-';
    },
    showError(err){
      this.errors.push(err.message);
    }
  },
  created(){
    this.calculate();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
