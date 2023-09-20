<template>
  <div class="profile-wrapper">
    <div class="layout">
      <h1 class="title">프로필 관리</h1>
      <div class="inner-layout">
        <div class="profile-wrapper">
          <div class="left">
            <ImageUpload></ImageUpload>
          </div>
          <div class="right">
            <article class="card-wrapper">
              <div class="header">
                <p class="title">내 관심정보</p>
                <Button :style-type="'middle'" :color="'white'"
                  >변경하기</Button
                >
              </div>
              <div class="main-wrapper">
                <div class="item-container">
                  <p class="title">관심지역</p>
                  <div class="tag-container">
                    <div class="icon">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <p class="content">강남역·역삼·선릉·삼성</p>
                  </div>
                </div>
                <div class="item-container">
                  <p class="title">프로필</p>
                  <div class="tag-container">
                    <div class="icon"><i class="fa-solid fa-laptop"></i></div>
                    <p class="content">원하는 곳에서 자유롭게 일하는</p>
                  </div>
                </div>
                <div class="item-container">
                  <p class="title">관심사</p>
                  <div class="tag-container">
                    <p class="content">IT기술</p>
                  </div>
                  <div class="tag-container">
                    <p class="content">여행/워케이션</p>
                  </div>
                  <div class="tag-container">
                    <p class="content">커리어/자기계발</p>
                  </div>
                </div>
              </div>
            </article>
            <article class="card-wrapper privacy-setting">
              <ul class="main-wrapper">
                <li class="item">
                  <p class="title">닉네임</p>
                  <p class="content">
                    정근희
                    <a href="#" class="link-btn">변경하기</a>
                  </p>
                </li>
                <li class="item">
                  <p class="title">이메일</p>
                  <p class="content">geunhee0212@gmail.com</p>
                  <p class="mutation">
                    <span class="completed">인증완료</span>
                  </p>
                </li>
                <li class="item">
                  <p class="title">연락처</p>
                  <p class="content">01053852003</p>
                  <p class="mutation">
                    <Button :style-type="'middle'" :color="'purple'"
                      >인증하기</Button
                    >
                  </p>
                </li>
                <li class="item">
                  <p class="title">SNS연동</p>
                  <p class="content">
                    <i class="fa-brands fa-instagram"></i>
                    네이버 연동
                  </p>
                  <Swipe :id="'naverSwipe'" :value="'naverSwipe'" />
                </li>
                <li class="item">
                  <p class="title"></p>
                  <p class="content">
                    <i class="fa-brands fa-facebook"></i>
                    카카오 연동
                  </p>
                  <Swipe :id="'kakaoSwipe'" :value="'kakaoSwipe'" />
                </li>
                <li class="item">
                  <p class="title">비밀번호</p>
                  <p class="content">
                    <a class="link-btn" href="">변경하기</a>
                  </p>
                </li>
                <li class="item">
                  <p class="title">마케팅 수신동의</p>
                  <p class="content">이메일</p>
                  <Swipe :id="'emailSwipe'" :value="'emailSwipe'" />
                </li>
                <li class="item">
                  <p class="title"></p>
                  <p class="content">SMS</p>
                  <Swipe :id="'smsSwipe'" :value="'smsSwipe'" />
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { ACTION } from '../store'
import Swipe from '@/components/Swipe/index.vue'

export default Vue.extend({
  name: 'Profile',
  components: { Swipe },
  async asyncData({ store }) {
    try {
      const user = await store.dispatch(ACTION.FETCH_GET_USER)
      return {
        user
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        return {
          user: {},
          status: 401
        }
      }
    }
  },
  data() {
    return {
      user: {},
      status: 200
    }
  },
  async fetch() {
    if (this.status === 401) {
      try {
        const token = await this.$store.dispatch(ACTION.FETCH_REFRESH_TOKEN)
      } catch (error) {
        if (error.response.status === 401) {
          this.$store.dispatch(ACTION.LOGOUT)
        }
      }

    }
  },
})
</script>

<style lang="scss" scoped>
.profile-wrapper {
  font-size: 0.875rem;
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

.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: $bg-color2;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
}

.inner-layout {
  display: flex;
  padding: 1.875rem 0;
}
.layout > .title {
  padding: 7.5rem 0 1.25rem 0;
  font-size: 2.125rem;
  text-align: center;
}
.profile-wrapper {
  display: grid;
  grid-template-columns: 300px 600px;
  column-gap: 96px;
  margin: 0 auto;
}
.card-wrapper {
  margin-bottom: 30px;
  background: #fff;
  border-radius: 5px;
}
.card-wrapper:nth-last-child(1) {
  margin-bottom: 0;
}

.card-wrapper .header {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 1.25rem 2rem;
  align-items: center;
  justify-content: space-between;
  background: #704de4;
  color: #fff;
}
.card-wrapper .header .title {
  flex-grow: 1;
}
.main-wrapper {
  display: grid;
  row-gap: 1.875rem;
  padding: 1.875rem 2rem 4rem;
}
.main-wrapper .item-container {
}
.main-wrapper .item-container .title {
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  font-size: 0.7rem;
}
.main-wrapper .item-container .tag-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 0.7rem;
  margin: 0 0.5rem 0 0;
}
.main-wrapper .item-container .tag-container:nth-last-child(1) {
  margin-right: 0;
}
.privacy-setting {
}

.privacy-setting ul li {
  display: grid;
  grid-template-columns: 130px 1fr auto;
}

li .title {
  color: #656565;
}

.link-btn {
  display: block;
  color: #656565;
}

.completed {
  color: #ffd014;
}
</style>
