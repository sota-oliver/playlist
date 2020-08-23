<template>
  <div class="background">
    <div class="header-shape">
      <h3 class="Album-list">Album list</h3>
        <div class="searchBox">
            <input v-model="store.searchTerm" class="searchInput" type="text" name="" placeholder="Search">
            <button class="searchButton" disabled>
                <i class="material-icons">
                  <i class="fas fa-search"></i>
                </i>
            </button>
        </div>
        <div class="search-wrapper">
            <input v-model="store.searchTerm" class="field2" type="text" name="" placeholder="Search">
        </div>
    </div>
    <div class="limitAlbums">
      <div class="limit-5" @click="limitFive">5</div>
      <div class="limit-8" @click="limitEight">8</div>
    </div>
    <ul class="albums-wrapper">
        <li @click="gotoDetails(albumCard)" :key="albumCard.id" v-for="albumCard in albumCards" class="album">
          <Album :id="albumCard.id" :propsAlbum="albumCard"/>
        </li>
    </ul>
  </div>
</template>

<script>
import { Albums } from '@/services';
import _ from 'lodash';
import store from '@/store.js';
import Album from '@/components/Album.vue';
export default {
  name: 'albumList',
  data(){
      return {
          store,
          albumCards: [],
          limit:10
      };
  },
  watch: {
      'store.searchTerm': _.debounce(function(val) {
        this.fetchAlbums(val);
      }, 500),
  },
  async mounted(){
      await Albums.getAll();
  },
  created() {
      this.fetchAlbums();
  },
  methods:{
      async fetchAlbums(term) {
        term = term || store.searchTerm;
        this.albumCards = await Albums.searchAlbums(term);
      },
      gotoDetails(albumCard) {
        this.$router.push({path: `artist/${albumCard.artistId}`});
        localStorage.setItem("artistId", albumCard.artistId);
        localStorage.setItem("artistName", albumCard.artist);
      },
      async limitFive(){
        this.limit = 5;
        this.albumCards = await Albums.limitAlbums(this.limit);
      },
      async limitEight(){
        this.limit = 8;
        this.albumCards = await Albums.limitAlbums(this.limit);
      },
      showSearch(){
        const input = document.getElementById("search-input");
        const searchBtn = document.getElementById("search-btn");

        const expand = () => {
          searchBtn.classList.toggle("close");
          input.classList.toggle("square");
        };

        searchBtn.addEventListener("click", expand);
      }
  },
  components:{
    Album
  },
}
</script>

<style lang="scss">
:root {
  --aqua: #13d6ea;
  --muted-white: #f9f9f9;
  --blackish: #363636;
  --pinkish-grey: #cfcfcf;
  --turquoise-blue: #00accf;
  --warm-grey: #828282;
  --muted-black: #282828;
  --greyish: #a6a6a6;
  --greyish-brown: #545454;
  --white: #ffffff;
  --font: 'Work Sans', sans-serif;
}
h3{
  padding:0;
  margin:0;
  vertical-align: middle;
}
.background {
  background-color: var(--muted-white);
}

/* Header */
.header-shape {
  height: 6.25rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.18);
  padding: 0 150px 0 150px;
  background-color: var(--white);
}
.Album-list {
  display: inline-block;
  width: 49%;
  height: 28px;
  font-family: 'Work Sans', sans-serif;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.88px;
  color: var(--blackish);
}
.search-wrapper{
  width: 50%;
  display:inline-block;
  margin-top:30px;
}
.field2 {
  align-content:flex-end;
  padding-left: 10px;
  height: 35px;
  display:inline-block;
  width:97%;
  opacity: .2;
  border-radius: 4px;
  color: var(--warm-grey);
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: var(--white);
}
.field2, select, textarea{
    color: var(--muted-black);
}
.searchBox {
    display:none;
    position: absolute;
    top: 23px;
    right: 150px;
    height: 40px;
    border-radius: 10px;
    border: 1.5px solid var(--warm-grey);
    padding: 5px;

}
.searchBox:hover > .searchInput {
    width: 180px;
    padding: 0 6px;
}

.searchBox:hover > .searchButton {
  background: white;
  color :var(--muted-black);
}

.searchButton {
    color: var(--muted-black);
    float: right;
    border: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
}

.searchInput {
    border:none;
    background: none;
    outline:none;
    float:left;
    padding: 0;
    color: var(--muted-black);
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;

}





/* Body */
.limitAlbums{
  padding: 25px 150px 0 150px;
}
.limit-5{
  display:inline-block;
  padding: 5px 10px;
  margin: 0 5px;
  background-color: var(--aqua);
  color: var(--white);
  border-radius: 20px;
}
.limit-8{
  display:inline-block;
  padding: 5px 10px;
  margin: 0 5px;
  background-color: var(--aqua);
  color: var(--white);
  border-radius: 20px;
}
.limit-5, .limit-8:hover{
  cursor: pointer;
}
.albums-wrapper{
  padding: 25px 150px 0 150px;
  margin:0;
  list-style: none;
}
.album{
  padding: 20px 20px 10px 20px;
  margin: 50px 0;
  box-shadow: 0 1px 3px 0 #e7e7e7;
  background-color: var(--white);
}
.album:first-child{
  margin-top:0;
}
.album:last-child{
  margin-bottom:0;
}
/* ------- Responsiveness ------- */
@media (max-width:800px){
  /* Navbar */
  .header-shape{
    padding: 0 100px 0 100px;
  }
  .searchBox {
    display:block;
    right:100px;
  }
  .field2{
    width:0;
    visibility: hidden;
  }
  .searchIcon{
    visibility: visible;
  }


  /* Body */
  .albums-wrapper{
    padding: 0 100px 0 100px;
  }
  .limitAlbums{
  padding: 25px 100px 0 100px;
}
}
@media (max-width:620px){
  /* Navbar */
  .header-shape{
    padding: 0 50px 0 50px;
  }
  .searchBox {
    right:50px;
  }


  /* Body */
  .albums-wrapper{
    padding: 0 50px 0 50px;
  }
  .limitAlbums{
  padding: 25px 50px 0 50px;
}
}
@media (max-width:520px){
  .searchBox:hover > .searchInput {
    width: 100px;
    padding: 0 6px;
  }
}
</style>

