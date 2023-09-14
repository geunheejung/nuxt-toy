import Vue from 'vue'
import Button from '@/components/Button/index.vue'
import TextField from '@/components/TextField/index.vue'
import DivisionLine from '@/components/DivisionLine/index.vue'

const components = [Button, TextField, DivisionLine]

components.forEach((Component: any) => Vue.component(Component.name, Component))
