import Vue from 'vue'
import Button from '@/components/Button/index.vue'
import TextField from '@/components/TextField/index.vue'
import DivisionLine from '@/components/DivisionLine/index.vue'
import Swipe from '@/components/Swipe/index.vue'
import ImageUpload from '@/components/ImageUpload/index.vue'

const components = [Button, TextField, DivisionLine, ImageUpload, Swipe]

components.forEach((Component: any) => Vue.component(Component.name, Component))
