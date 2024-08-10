<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>台灣咖啡店家收集錄</h1>
  </header>

  <RouterView />

  <footer>

    <div class="SocialButton">
      <a href="https://www.facebook.com/profile.php?id=100006388652311&locale=zh_TW"></a>
      <a href="https://www.instagram.com/owenhung._/"></a>
      <a href="https://www.youtube.com/channel/UCrtnc8ppyLHEv9brEwjb-Sw"></a>
      <a href="https://page.line.me/036zxtlb"></a>
    </div>
    <div class="tel">
      <p>聯絡我們:TEL:09-12345678<a href="tel:+0912345678"></a></p>
    </div>
    <div class="copyright">
      <p>Copyright &copy; 2024 yatayork. All rights reserved. </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import './assets/main.scss';


header {
  width: 100%;
  text-align: center;
  background-color: white;
  color: var(--main-font-color);

  padding-top: 1vh;
  padding-bottom: 1vh;
  backdrop-filter: blur(30px);

}

footer {
  width: 100%;
  background-color: #000000d9;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
  padding-bottom: 5vh;

  .SocialButton {


    padding: 10px;

    a {
      padding: 10px;
      @include IconUrl-button(1, "Social_Icon_brown", "facebook_brown.png", 32, 32);
      @include IconUrl-button(2, "Social_Icon_brown", "instagram_brown.png", 32, 32);
      @include IconUrl-button(3, "", "youtube.png", 32, 32);
      @include IconUrl-button(4, "Social_Icon_brown", "line_brown.png", 32, 32);
    }
  }



}
</style>
