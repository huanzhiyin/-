import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import  user from './user'
import  getters from './getters' 

Vue.use(Vuex)

const state = {
  username: '123' 
}

const store = new Vuex.Store({
  state,   
  getters, 
  actions, 
})

export default store 


// 使用实例
//组件A/methods函数
// sub(){
//       let log = document.querySelector("#log").value;
//       let reg = document.querySelector("#reg").value;
//       userapi("/users/userpsw",{name:log,psw:reg}, (mes) => {
//         if(mes === 1){
//           console.log(log)
//           
//           this.$store.commit("modifyAName",log)
//           // 账户名称    
//           console.log(this.$store.getters.resturantName)
//           document.querySelector(".text").innerHTML = "登录成功"
//           this.$router.push({ path: '/my' })
//         }else{
//           document.querySelector(".text").innerHTML = "登录失败"
//         }
//       })
//     },
// 
// 组件B/computed
//  computed:{
//       username(){//调用username即可   {{username}}
//          return  this.$store.getters.resturantName
//       }
//   },