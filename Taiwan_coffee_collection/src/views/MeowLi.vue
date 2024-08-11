<script>
import MeowLiCoffees from '../../src/collectScript/苗栗縣_coffee_shops.json'

export default{

  data() {
    return {
      MeowLiCoffees,
      currentPage:1,
      postPerPage:9,
    }
  },
  computed: {
    totalPages(){
      return Math.ceil(this.MeowLiCoffees.length/this.postPerPage)
    },

    paginatedPosts(){
      const startIndex = (this.currentPage -1)* this.postPerPage;
      const endIndex = startIndex + this.postPerPage;

      return [...this.MeowLiCoffees.slice(startIndex, endIndex)];
    }
  },
  methods: {
    
    nextPage(){
      if(this.currentPage<this.totalPages){
        this.currentPage++;
        window.scroll({
        top:0,
        behavior: 'smooth',
      })
      }
    },

    prevPage(){
      if(this.currentPage>1){
        this.currentPage--;

      }
    }
  },
}
</script>

<template>

    <div class="datalist">
      <transition-group name="list">
          <div class="container"  v-for="MeowLiCoffee in paginatedPosts" :key="MeowLiCoffee.name" >
            <div class="card">
              <a href="http://www.tunglodge.com.tw/" class="website"></a>
              <a href="https://www.google.com.tw/maps/preview" class="map"></a>
              <img src="https://yatayork.imgix.net/_pottery.jpeg" alt="shop logo">
              <div class="info">
                <h3>{{MeowLiCoffee.name}}</h3>
                <span>
                  連絡電話：09123456789

                </span>
                <span>
                  地址:{{MeowLiCoffee.address}}
                </span>
            </div>
          </div>
        </div>
    </transition-group>
    </div>
      


  <div class="pagination">
    
      <div>
        <button @click="prevPage" :disabled="currentPage === 1">
          上一頁
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          下一頁
        </button>
      </div>
    </div>
  

</template>

<style lang="scss" scoped>
@import '../assets/main.scss';

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0.5;
  transform: translateX(30px);
  
}

.datalist {



  // background config
  width: 100%;
  background-color: var(--header-background);

  //monitor grid config
  display: grid;
  grid-template-columns: repeat(3, 30vw);
  column-gap: 0vw;
  row-gap: 2vh;
  justify-content: center;
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

 .info{



   h3 {
      text-align: center;
      font-size: var(--font-size-large);
      margin-bottom: 3%;
      padding: 0% 3%;
    }

    span {
      display: block;
      padding: 0% 10%;
      text-align: left;
      font-size: var(--font-size-medium);


    }
 }
    

    img {
      width: 50%;
      margin-top: 10%;
      border-radius: 20px;

    }
  }

}

.pagination{
  height: 100%;
  display: block; 
  text-align: center;
  button{

    height: 100%;

    padding: 20px 20px;
    margin: 0px 10px;
    border: none;
    
    color: white;
    background-color: rgba(165, 42, 42, 0.91);
    font-size: 16px ;
    font-weight: 700;

    &:hover{
      background-color: black;
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


@keyframes grow {
    0% { transform: scale(.2); }
  100% { transform: scale(1); }
}

</style>