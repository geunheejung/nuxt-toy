<template>
  <article class="image-upload-wrapper">
    <div class="image-viewer-container">
      <img src="../../assets/images/img_profile_default.3ce641d.jpg" alt="" />
    </div>
    <div class="content-container">
      <p>정근희</p>
      <Button :type="'small'" :color="'basic'">프로필 사진 변경</Button>
    </div>
  </article>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.image-upload-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 32px;
  background: #fff;
}

.image-viewer-container {
}
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-container button {
  height: 30px;
  margin-top: 10px;
  padding: 0 8px;
  border: 1px solid $border-color2;
  background: #fff;
  color: $font-color;
  font-size: 0.75rem;
  width: 106px;
}
</style>
