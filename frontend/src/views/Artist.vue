<template>
  <div class="background">
    <div class="header-shape">
      <h3 class="Album-list">{{this.artistName}}</h3>
    </div>
    <ul class="albums-wrapper">
        <li :key="albumCard.id" v-for="albumCard in albumCards" class="album">
          <Album :id="albumCard.id" :propsAlbum="albumCard"/>
        </li>
    </ul>
  </div>
</template>

<script>
import { Artists } from '@/services';
import Album from '@/components/Album.vue';
export default {
  name: 'albumList',
  props: ['propsAlbum'],
  data(){
    return {
        albumCard: '',
        albumCards: [],
        artistName: ''
    };
  },
  async mounted() {
        let id = parseInt(localStorage.getItem("artistId"));
        this.albumCards = await Artists.fetchArtist(id)
        this.artistName = localStorage.getItem("artistName")
  },
  components:{
        Album
  },
}
</script>

<style>
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
  padding:36px 0;
  margin:0;
  vertical-align: middle;
}
.background {
  height: 100%;
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
  width: 50%;
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






/* Body */
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
  .field2{
    width:0;
    visibility: hidden;
  }


  /* Body */
  .albums-wrapper{
    padding: 30px 100px 30px 100px;
  }
}
@media (max-width:620px){
  /* Navbar */
  .header-shape{
    padding: 0 50px 0 50px;
  }


  /* Body */
  .albums-wrapper{
    padding: 30px 50px 30px 50px;
  }
}
</style>