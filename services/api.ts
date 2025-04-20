export const TMDB_CONFIG={
    BASE_URL:"https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API,
    headers:{
        accept: 'application/json',
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_API}`
    }
}

export const fetchMovies=async({ query}:{query:string})=>{
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;


    const response=await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers,
    })

    if(!response.ok){
        throw new Error("Failed to fetch movies", response.statusText);

        
    }

    const data=await response.json();

    return data.results;
}
// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzQzZDcxNGI1OTBhZTM1OGIzY2MyZjc1Njk3ZDU0YSIsIm5iZiI6MTc0NTA3MzMxNC42ODMsInN1YiI6IjY4MDNiNGEyZTNmYWMyZjkwMjg5OWY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mAJ6D4v4NK-dMrsUeSbhYbfIjaIg3hRLY6ch9oyFIcg'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));