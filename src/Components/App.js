import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner'

import Search from './Search/Search';
import Sidebar from './Sidebar/Sidebar';
import ArtistPage from './ArtistPage/ArtistPage';
import SongsPage from './SongsPage/SongsPage';
import AlbumsPage from './AlbumsPage/AlbumsPage';
import YTplayer from '../YTplayer/YTplayer';

import { fetchData, getLocal } from '../helpers/fetch';
import './App.css';
// localStorage.clear();


class App extends Component {

    state = {
        artistsData: [],
        albumsData: [],
        songsData: [],
        searchValue: '',
        isLoading: true,

        isYT: false,
        searchYTValue: '',
        // currentPosition: 'Artists',
        isSidebar: false,

        favoriteArtists: [],
        favoriteAlbums: [],
        favoriteSongs: [],

        interestingArtists: [],
        interestingAlbums: [],
        interestingSongs: [],
        };

    componentDidMount() {
        fetchData('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json&limit=48')
        .then(data => (
            this.setState({
                artistsData: data.artists.artist.sort((a, b) => (+b.listeners) - (+a.listeners)),
                isLoading: false,
                favoriteArtists: getLocal('favoriteArtists'),
                interestingArtists: getLocal('interestingArtists'),
            })
        ));

        fetchData('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json&limit=48')
        .then(data => (
            this.setState({
                albumsData: data.albums.album,
                isLoading: false,
                favoriteAlbums: getLocal('favoriteAlbums'),
                interestingAlbums: getLocal('interestingAlbums'),
            })
        ));

        fetchData('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json&limit=30')
        .then(data => (
            this.setState({
                songsData: data.tracks.track,
                isLoading: false,
                favoriteSongs: getLocal('favoriteSongs'),
                interestingSongs: getLocal('interestingSongs'),
            })
        ))
    }

    sidebarToggle = () => {
        this.setState(prev => ({
            isSidebar: !prev.isSidebar,
        }))
    };

    addFavourite = ({target}) => {
        const index = target.dataset.index;
        const arrForAdd = target.dataset.arrForAdd;
        const check = target.dataset.check;
        const curentItem = this.state[check][index];
        console.log(curentItem);
        // if (!this.state[arrForAdd].includes(curentItem))
        if (!this.state[arrForAdd].some(el => (el.url === curentItem.url)))
        {
            this.setState((prev, next) => ({
                [arrForAdd]: [curentItem, ...prev[arrForAdd]],
            }), () => {
                localStorage.setItem(`${arrForAdd}`, JSON.stringify(this.state[arrForAdd]));
            })
        } else {
            this.setState((prev, next) => ({
                [arrForAdd]: prev[arrForAdd].filter(el => el.url !== curentItem.url),
            }), () => {
                localStorage.setItem(`${arrForAdd}`, JSON.stringify(this.state[arrForAdd]));
            })
        }
    };

    runYT = ({target}) => {
        // this.setState(prev => ({
        //     isYT: !prev.isYT,
        // }))
        if (target.className === 'closeYT') {
        this.setState({
            isYT: false,
        })
        }
        if (target.className === 'card__svg')  {
        const index = target.dataset.index;
        const check = target.dataset.check;
        const curentItem = this.state[check][index];
        let nameForSearch = '';

        if (check === 'albumsData') {
            nameForSearch = curentItem.artist.name || curentItem.artist;
        }
        if (check === 'artistsData') {
            nameForSearch = 'history';
        }
        if (check === 'songsData') {
            nameForSearch = curentItem.artist.name || curentItem.artist;
        }

        console.log(check);
        console.log(nameForSearch);


        const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${nameForSearch} ${curentItem.name}&key=AIzaSyDGN9rObP1myvj8xpwmr796k71zPmOp8Vk`;
        console.log(curentItem);

        fetch(URL)
            .then(responce => {
            if(responce.ok) return responce.json();

        throw new Error('error: ' +responce.statusText);
    }).then(data => {const id = data.items[0].id.videoId || data.items[0].id.channelId
    this.setState ({
        searchYTValue: id,
        isYT: true,
    });
    console.log(this.state.searchYTValue);

    })
    .catch (err => console.log(err));

        }
    };

    inputChange = (e) => {
        const value = e.target.value.toLowerCase();
        const name = e.target.name;
        this.setState({
            [name]: value,
        })
    };

    searchData = (e) => {
        e.preventDefault();
        if (this.state.searchValue.trim() === '') {
            return
        }
        fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json&limit=48`)
        .then(({results}) => {
            this.setState({
                artistsData: results.artistmatches.artist,
            })
        });

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json&limit=48`)
        .then(({results}) => {
            this.setState({
                albumsData: results.albummatches.album,
            })
        });

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json&limit=30`)
        .then(({results}) => {
            this.setState({
                songsData: results.trackmatches.track,
            })
        })
    };

        // axios.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json')
        // .then(({status, data}) => {
        //     if (status === 200) {
        //         this.setState({
        //             artistsData: data.artists.artist.sort((a, b) => (+b.listeners) - (+a.listeners)),
        //         })
        //     }
        // })

        // axios.get('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json')
        // .then(({data, status}) => {
        //     if (status === 200) {
        //         this.setState({
        //             albumsData: data.albums.album,
        //         })
        //     }
        // })

        // axios.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json')
        // .then(({data, status}) => {
        //     if (status === 200) {
        //         this.setState({
        //             songsData: data.tracks.track,
        //         })
        //     }
        // })

    render () {
        const {artistsData, albumsData, songsData, searchValue, isLoading, favoriteArtists, favoriteAlbums, favoriteSongs, interestingArtists, interestingAlbums, interestingSongs, isSidebar} = this.state;
        return (
        <div className='wrapper'>
            <div className="container">
                <Sidebar className={isSidebar ? 'aside aside-show' : 'aside'}/>
                <main className='main'>
                    {this.state.isYT ? <YTplayer runYT={this.runYT} searchYTValue={this.state.searchYTValue}/> : null}
                    <Search value={searchValue} onChange={this.inputChange} handlerSearch={this.searchData} sidebarToggle={this.sidebarToggle}/>
                    {isLoading ?
                    <div className="loader">
                                <Loader
                                type="Audio"
                                color="var(--red)"
                                height="100"
                                width="100"
                                />
                    </div> :
                    <div>
                        <Switch>
                            <Route exact path='/' render={() => <ArtistPage checkArr='artistsData' artistsData={artistsData} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                            <Route path='/albums' render={() => <AlbumsPage checkArr='albumsData' albumsData={albumsData} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                            <Route path='/songs' render={() => <SongsPage checkArr='songsData' songsData={songsData} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>

                            <Route path='/FavoriteArtists' render={() => <ArtistPage checkArr='favoriteArtists' artistsData={favoriteArtists} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                            <Route path='/FavoriteAlbums' render={() => <ArtistPage checkArr='favoriteAlbums' artistsData={favoriteAlbums} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                            <Route path='/FavoriteSongs' render={() => <SongsPage checkArr='favoriteSongs' songsData={favoriteSongs} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>

                            <Route path='/InterestingArtists' render={() => <ArtistPage checkArr='interestingArtists' artistsData={interestingArtists} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                            <Route path='/InterestingAlbums' render={() => <ArtistPage checkArr='interestingAlbums' artistsData={interestingAlbums} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                            <Route path='/InterestingSongs' render={() => <SongsPage checkArr='interestingSongs' songsData={interestingSongs} addFavourite={this.addFavourite} runYT={this.runYT}/>}/>
                        </Switch>
                    </div>
                    }
                </main>
            </div>
        </div>
    )};
}

export default App;
