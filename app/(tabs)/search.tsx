import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appWrite';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text,View } from 'react-native';

const search=()=>{

    const [searchQuery, setSearchQuery]= useState('');


  const {data:movies, refetch:loadMovies, reset, loading:movieLoading, error:moviesError}=useFetch(()=>(fetchMovies({
    query:`${searchQuery}`
  })))

  useEffect(()=>{

    

    const timeoutId=setTimeout(async()=>{

            if(searchQuery.trim()){
                await loadMovies();

                if(movies?.length>0 && movies?.[0]){
                    await updateSearchCount(searchQuery,movies[0]);
                }
            }
            else{

                reset();
            }
    },500);

    return ()=>clearTimeout(timeoutId)

  },[searchQuery])

  useEffect(()=>{

    if(movies?.length>0 && movies?.[0]){
        updateSearchCount(searchQuery,movies[0]);
    }

  },[movies])

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0 " resizeMode='cover'/>

            <FlatList 
                    data={movies}
                    renderItem={({item})=>(
                        <MovieCard {...item}/>
                    )}
                    keyExtractor={(item)=> item.id.toString()}
                    className="px-5"
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent:"center",
                        gap: 16,
                        marginVertical:16
                    }}
                    contentContainerStyle={{paddingBottom:100}}
                    ListHeaderComponent={
                        <>
                            <View className="w-full flex-row justify-center mt-20">
                                <Image source={icons.logo} className="w-12 h-10 mb-3"/>
                            </View>

                            <View>
                                <SearchBar placeholder="Searching Movies.."
                                            value={searchQuery}
                                            onChangeText={(text)=>setSearchQuery(text)}
                                />
                            </View>

                            {
                                movieLoading && (
                                    <ActivityIndicator size="large" color="#0000ff " className="my-3"/>
                                )
                            }

                            {
                                moviesError && (
                                    <Text className="text-red-500 px-5 my-3">
                                        Error: {moviesError.message}
                                    </Text>
                                )
                            }




                            {!movieLoading &&
                            !moviesError &&
                            searchQuery.trim() &&
                            movies?.length! > 0 && (
                                        <Text className="text-xl text-white font-bold">
                                        Search Results for{" "}
                                        <Text className="text-accent">{searchQuery}</Text>
                                        </Text>
                            )}
                        </>
                    }
                    ListEmptyComponent={
                        !movieLoading && !moviesError ? (
                            <View className="mt-10 px-5"> 
                                <Text className="text-center text-gray-500">
                                    {searchQuery.trim()?'No Movies Found':'Search for Movies'}
                                </Text>
                            </View>
                        ):null
                    }
                />
        </View>
    )
}

export default search