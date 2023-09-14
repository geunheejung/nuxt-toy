<template>
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
              <Button :style-type="'small'" :color="'white'">변경하기</Button>
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
          <article class="card-wrapper">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: $bg-color2;
  width: 100vw;
  height: 100vh;
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
</style>
