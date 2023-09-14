<template>
  <div class="profile-wrapper">
    <section class="user-info-wrapper">
      <ul class="info-container">
        <li class="info-field">
          <div class="title">
            <span>닉네임</span>
          </div>
          <div class="content">
            <p>{{ user.name }}</p>
            <button>변경하기</button>
          </div>
        </li>
        <li class="info-field">
          <div class="title">
            <span>이메일</span>
          </div>
          <div class="content">
            <p>{{ user.email }}</p>
            <button>변경하기</button>
          </div>
        </li>

        <li class="info-field">
          <div class="title">
            <span>연락처</span>
          </div>
          <div class="content">
            <button>인증하기</button>
          </div>
        </li>

        <li class="info-field">
          <div class="title">
            <span>비밀번호</span>
          </div>
          <div class="content">
            <button>변경하기</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { fetchGetUser } from '../api/member'

export default Vue.extend({
  name: 'Profile',
  layout: 'auth',
  async asyncData() {
    // 유저 정보 불러와야함
    const res = await fetchGetUser()

    return {
      user: res.data.data,
    }
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.profile-wrapper {
  display: grid;
}

.user-info-wrapper {
  background: #fff;
  padding: 1rem;
}

.info-container {
  display: grid;
  row-gap: 1.5rem;
}

.info-field {
  display: grid;
  grid-template-columns: 103px 1fr;
}

.info-field .title {
  color: #656565;
}

.info-field .content button {
  background: none;
  border: none;
  text-decoration: underline;
  color: #656565;
  text-decoration: underline;
  padding: 0;
  cursor: pointer;
}
.info-field .content {
}
</style>
