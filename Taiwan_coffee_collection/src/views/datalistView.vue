<script>
</script>

<template>
  <div class="datalist">
    <!-- 一個card對應一個json檔內的店家 -->
    <div class="container">
      <div class="card">
        <div class="box"></div>
        <img src="https://yatayork.imgix.net/_pottery.jpeg" alt="shop logo">
        <div class="info">
          <h3>店名</h3>
          <span>
            連絡電話:09123456789
          </span>
          <span>
            地址:xx縣xx裡xx錄xx段x號
          </span>

        </div> <!-- <button class="more">More</button> -->
      </div>
    </div>

    <div class="container">
      <div class="card">
        <a href="#" class="website"></a>
        <a href="#" class="map"></a>
        <img src="https://yatayork.imgix.net/_pottery.jpeg" alt="shop logo">
        <div class="info">
          <h3 @click="search">店名</h3>
          <span>
            連絡電話:09123456789
          </span>
          <span>
            地址:xx縣xx裡xx錄xx段x號
          </span>

        </div> <!-- <button class="more">More</button> -->
      </div>
    </div>

    <div class="container">
      <div class="card">

        <img src="https://yatayork.imgix.net/_pottery.jpeg" alt="shop logo">
        <div class="info">
          <h3>店名</h3>
          <span>
            連絡電話:09123456789
          </span>
          <span>
            地址:xx縣xx裡xx錄xx段x號
          </span>

        </div> <!-- <button class="more">More</button> -->
      </div>
    </div>

    <div class="container">
      <div class="card">
        <div class="box"></div>
        <img src="https://yatayork.imgix.net/_pottery.jpeg" alt="shop logo">
        <div class="info">
          <h3>店名</h3>
          <span>
            連絡電話:09123456789
          </span>
          <span>
            地址:xx縣xx裡xx錄xx段x號
          </span>

        </div> <!-- <button class="more">More</button> -->
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '../assets/main.scss';

.datalist {

  // background config
  width: 100%;
  background-color: var(--header-background);


  //monitor grid config
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 0vw;
  row-gap: 2vh;

  padding-top: 3vh;

  .container {
    display: flex;
    margin: 10% 10% 5% 10%;
    justify-content: center;
  }



  .card {
    background-color: white;
    backdrop-filter: blur(25px);
    box-shadow: inset 0px 0px 20px 3px rgba(0, 0, 0, 0.534);
    width: 100%;
    border-radius: 20px 20px 20px 20px;
    text-align: center;
    padding-bottom: 5%;
    position: relative;


    .website {
      box-shadow: 0px 0px 10px 1px rgba(93, 33, 33, 0.733);
      padding: 5px;
      border-radius: 20%;
      background-color: antiquewhite;
      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      right: 10%;
      top: 17%;

      &:before {
        content: url("https://yatayork.imgix.net/link.png?w=32&h=32");
      }

      &:hover {
        background-color: brown;
        transform: rotate(10deg);

        &:before {
          content: url("https://yatayork.imgix.net/link-white.png?w=32&h=32");

        }
      }

      &:active {
        box-shadow: inset 0px 0px 10px 1px rgba(38, 13, 13, 0.733);
      }
    }

    .map {
      box-shadow: 0px 0px 10px 1px rgba(93, 33, 33, 0.733);
      padding: 5px;
      border-radius: 20%;
      background-color: antiquewhite;
      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      right: 10%;
      top: 37%;

      &:before {
        content: url("https://yatayork.imgix.net/map_brown.png?w=32&h=32");
      }

      &:hover {
        background-color: brown;
        transform: rotate(10deg);

        &:before {
          content: url("https://yatayork.imgix.net/map_white.png?w=32&h=32");

        }
      }

      &:active {
        box-shadow: inset 0px 0px 10px 1px rgba(38, 13, 13, 0.733);

      }
    }

    h3 {
      text-align: center;
      font-size: var(--font-size-large);
      margin-bottom: 3%;
    }

    span {
      display: block;
      width: 100%;
      text-align: left;
      padding-left: 23%;
      font-size: var(--font-size-medium);
    }

    img {
      width: 50%;
      margin-top: 10%;
      border-radius: 20px;

    }
  }

}

@media (max-width:1440px) {
  .datalist {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width:1024px) {
  .datalist {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:768px) {
  .datalist {
    grid-template-columns: repeat(1, 1fr);

    .card {
      width: 80%;
    }
  }
}

@media (max-width: 600px) {
  .datalist {
    .card {
      width: 90%;

      .website {
        right: 10%;
        top: 14%;

        &:before {
          content: url("https://yatayork.imgix.net/link.png?w=24&h=24");
        }

        &:hover {
          &:before {
            content: url("https://yatayork.imgix.net/link-white.png?w=32&h=32");
          }

        }

        &:active {
          box-shadow: inset 0px 0px 10px 1px rgba(38, 13, 13, 0.733);
        }
      }

      .map {
        right: 10%;
        top: 34%;

        &:before {
          content: url("https://yatayork.imgix.net/map_brown.png?w=24&h=24");
        }

        &:hover {
          background-color: brown;

          &:before {
            content: url("https://yatayork.imgix.net/map_white.png?w=32&h=32");
          }
        }

        &:active {
          box-shadow: inset 0px 0px 10px 1px rgba(38, 13, 13, 0.733);
        }
      }

      span {
        padding-left: 15%;
      }
    }
  }

}

@media (max-width: 425px) {
  .datalist {

    .container {
      display: flex;
      margin: 10% 1% 5% 1%;
      justify-content: center;
    }

    .card {

      .website {
        right: 10%;
        top: 10%;

        &:before {
          content: url("https://yatayork.imgix.net/link.png?w=16&h=16");
        }

        &:hover {
          &:before {
            content: url("https://yatayork.imgix.net/link-white.png?w=16&h=16");
          }
        }

        &:active {
          box-shadow: inset 0px 0px 10px 1px rgba(38, 13, 13, 0.733);
        }
      }

      .map {
        right: 10%;
        top: 30%;

        &:before {
          content: url("https://yatayork.imgix.net/map_brown.png?w=16&h=16");
        }

        &:hover {
          background-color: brown;

          &:before {
            content: url("https://yatayork.imgix.net/map_white.png?w=16&h=16");
          }
        }

        &:active {
          box-shadow: inset 0px 0px 10px 1px rgba(38, 13, 13, 0.733);
        }
      }

      span {
        padding-left: 10%;
      }

    }
  }
}
</style>
