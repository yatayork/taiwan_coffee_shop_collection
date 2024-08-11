<script>


export default{
  methods: {
    //用select選單切換地區 渲染資料
    changeRoute(e) {
      this.$router.push("/" + e.target.value);
    },
  },
}

</script>

<template>
  <header>
    <h1>台灣咖啡店家收集錄</h1>
    <select name="field" id="field" v-on:change="changeRoute($event)">
      <option selected>請選擇地區</option>
      <option value="meowli">苗栗</option>
      <option value="keelung">基隆</option>
    </select>
  </header>
  <!-- 後續確認好資料能正確渲染到正確位置後再加入其他地區選項 -->
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

.fade-enter-active,
.fade-leave-active{
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to{
  opacity:0;
}

header {
  width: 100%;
  background-color: white;
  color: var(--main-font-color);
  display: flex;
  justify-content: center;
  padding-top: 1vh;
  padding-bottom: 1vh;

  h1{
    margin-right: 1vw;
  }

  select{
    width: 10vw;

    border: 1px solid burlywood;
    padding: 10px 10px;
  }

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
