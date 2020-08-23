<template>
    <div class="album-body">
        <div class="album-section-left display-inline">
            <img :src="propsAlbum.imageUrl" class="album-image display-inline"/>
            <div class="album-info display-inline">
                <label class="album-title" id="albumId">{{propsAlbum.title}}</label>
                <label class="album-artist">{{propsAlbum.artist}}</label>
            </div>
        </div>
        <div class="album-section-right display-inline">
            <label class="album-release display-inline"><label class="album-release-muted">Released:</label> {{propsAlbum.releaseDate.substr(0, 4)}}</label>
            <label class="album-price display-inline">{{propsAlbum.price}}</label>
            <div :class="propsAlbum.favorite ? 'album-button-unfavorite' : 'album-button-favorite'" :id="propsAlbum.id" @click="markFavorite">Mark as favorite</div>
        </div>
    </div>
</template>

<script>
import { Albums, Artists } from '@/services';
import store from '@/store.js'
export default {
    props: ['propsAlbum'],
    data(){
        return store;
    },
    async mounted(){
        this.artistTitle = await Artists.getOne(this.propsAlbum.artistId);
        this.propsAlbum.artist = this.artistTitle.artist;
        console.log(this.propsAlbum.artistId);

        let width = window.innerWidth;
        let string = this.propsAlbum.title;
        if(width > 1080){
            let length = 15;
            let trimmedString = string.length > length ? 
                        string.substring(0, length - 3) + "..." : 
                        string;
            this.propsAlbum.title = trimmedString
        }else if(width < 1080 && width > 520){
            let length = 10;
            let trimmedString = string.length > length ? 
                        string.substring(0, length - 3) + "..." : 
                        string;
            this.propsAlbum.title = trimmedString
        }
    },
    methods:{
        async markFavorite(){
            let id = this.propsAlbum.id;
            this.favorite = await Albums.getOne(this.propsAlbum.id);
            this.selected = this.favorite.favorite
            if(!this.selected){
                this.selected = true;
                let replacement = {
                    favorite: this.selected
                }
                this.favoritedAlbum = await Albums.markFavorite(id, replacement)
            }else{
                this.selected = false;
                let replacement = {
                    favorite: this.selected
                }
                this.favoritedAlbum = await Albums.markFavorite(id, replacement)
            }
            this.$router.go()
        }
    }
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
.album-body{
    font-family: var(--font);
}
.display-inline{
    display:inline-block;
}
.album-section-left{
    width:32%;
}
.album-section-right{
    width:68%;
    vertical-align: top;
    text-align: right;
}
.album-info{
    vertical-align: top;
}
.album-image{
    height: 70px;
    width: 70px;
}
.album-title{
    display:block;
    padding:10px 0 20px 40px;
}
.album-artist{
    display:block;
    padding:0 0 0 40px;
    opacity: 30%;
}
.album-release{
    padding: 30px 100px 30px 0;
}
.album-release-muted{
    opacity: 30%;
}
.album-price{
    padding: 30px 80px 30px 0;
}
.album-button-favorite{
    display:inline-block;
    padding: 10px;
    background-color: var(--aqua);
    color:var(--white);
    border-radius: 5px;
    cursor: pointer;
}
.album-button-unfavorite{
    display:inline-block;
    padding: 10px;
    background-color: var(--white);
    color:var(--aqua);
    text-decoration: underline;
    cursor: pointer;
}


/* ------- Responsiveness ------- */
@media (max-width:1080px){
    .album-section-left{
        width:35%;
    }
    .album-section-right{
        width:65%;
    }
    .album-release{
        padding: 30px 20px 30px 0;
    }
    .album-price{
        padding: 30px 20px 30px 0;
    }
    .album-title{
        padding:10px 0 20px 20px;
    }
    .album-artist{
        padding:0 0 0 20px;
    }
}
@media (max-width:905px){
    .album-image{
        height: 200px;
        width: 200px;
    }
    .header-shape{
        padding: 0 100px 0 100px;
    }
    .album-info{
        display:inline-block;
    }
    .album-section-left{
            width:100%;
    }
    .album-section-right{
        width:100%;
        text-align: center;
    }
    .album-title{
        padding:60px 0 20px 20px;
        font-size: 25px;
    }
    .album-artist{
        padding:0 0 0 20px;
        font-size: 25px;
    }
}
@media (max-width:520px){
    .album-image{
        height: 200px;
        width: 200px;
    }
    .header-shape{
        padding: 0 100px 0 100px;
    }
    .album-info{
        display:block;
    }
    .album-section-left{
        width:100%;
        text-align: center;
    }
    .album-section-right{
        width:100%;
        text-align: center;
    }
    .album-title{
        padding:30px 0 20px 0;
        font-size: 25px;
    }
    .album-artist{
        padding:0 0 0 0;
        font-size: 25px;
    }
    .album-price{
        padding: 30px 0 0 0;
    }
    .album-button-favorite{
        display:block;
    }
}
</style>