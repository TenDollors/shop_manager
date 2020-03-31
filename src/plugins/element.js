import Vue from 'vue'
import {
  Button,
  Radio,
  Row,
  Input,
  Form,
  FormItem,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
// 将Message组件挂载到VUE对象 作为全局属性
Vue.prototype.$msg = Message
