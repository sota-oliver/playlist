import axios from 'axios'


let Service = axios.create({
    baseURL: 'http://localhost:3004',
    timeout: 1000
})

let Artists = {
    async getOne(id){
        let response = await Service.get(`/artists/${id}`);
        let doc = response.data;
        return {
                id: doc.id,
                artist: doc.title
        };
    },
    /* Klik na ime izvođača vodi na njegov single page */
    async fetchArtist(id) {
        let options = {};
        let checkId = await Service.get(`/artists/${id}`);
        let check = checkId.data.id;
        if (id === check) {
            options.params = {
                artistId: id,
            };
        }
        let response = await Service.get('/albums', options);
        let data = response.data;
        data = data.map(doc => {
            return {
                id: doc.id,
                title: doc.title,
                price: doc.price,
                imageUrl: doc.imageUrl,
                releaseDate: doc.releaseDate,
                artistId: doc.artistId,
                favorite: doc.favorite,
            };
        });
        return data;
    }
}
let Albums = {
    /* Prikaz svih informacija o albumu i izvođaču */
    async getOne(id){
        let response = await Service.get(`/albums/${id}`);
        let doc = response.data;
        return {
                id: doc.id,
                title: doc.title,
                price: doc.price,
                imageUrl: doc.imageUrl,
                releaseDate: doc.releaseDate,
                artistId: doc.artistId,
                favorite: doc.favorite,
                artist: doc.artist
        };
    },
    async getAll(){
        let response = await Service.get('/albums');
        let data = response.data
        return data;
    },
    /* Mogućnost filtriranja albuma preko API-ja */
    async searchAlbums(searchTerm) {
        let options = {};
        if (searchTerm) {
            options.params = {
                title: searchTerm,
            };
            let searchQuerry = options.params;
            let response = await Service.get(`/albums/?q=${searchQuerry.title}`);
            let data = response.data
            
            data = data.map(doc => {
                return {
                    id: doc.id,
                    title: doc.title,
                    price: doc.price,
                    imageUrl: doc.imageUrl,
                    releaseDate: doc.releaseDate,
                    artistId: doc.artistId,
                    favorite: doc.favorite,
                    artist: doc.artist
                };
            });
            return data;
        }else{
            let response = await Service.get('/albums');
            let data = response.data
            return data;
        }
        
        
    },
    /*  Ruta prihvaća opcionalni query parametar “limit” koji definira limit za request na api */
    async limitAlbums(limit){
        let response = await Service.get('/albums');
        let data = response.data;
        data = data.slice(0, limit).map(doc => {
            return {
                id: doc.id,
                title: doc.title,
                price: doc.price,
                imageUrl: doc.imageUrl,
                releaseDate: doc.releaseDate,
                artistId: doc.artistId,
                favorite: doc.favorite,
            };
        });
        return data;
    },
    /* Mogućnost označavanja albuma kao “favorite” */
    async markFavorite(id, replacement){
        let response = await Service.patch(`/albums/${id}`, replacement);
        return response.data;
    },
}
export {Service, Artists, Albums}