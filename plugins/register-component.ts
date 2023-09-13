import Vue from 'vue'
import Button from '@/components/Button/index.vue'
import TextField from '@/components/TextField/index.vue'

const components = [Button, TextField]

components.forEach((Component: any) => Vue.component(Component.name, Component))
