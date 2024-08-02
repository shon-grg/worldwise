/* eslint-disable react/prop-types, no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";


const BASE_URL='http://localhost:8000'

const CityContext =createContext()

function CitiesProvider({children}){
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity,setCurrentCity] =useState({})

  
    useEffect(function(){
      async function fetchCities(){
       try{
        setIsLoading(true)
       const res=await fetch(`${BASE_URL}/cities`)
        const data=await res.json();
        setCities(data);
      }catch{
        alert('There is an error loading data...')
      }finally{
        setIsLoading(false)
      }
      }
      fetchCities();
    },[])


        async function getCity(id){
            try{
             setIsLoading(true)
            const res=await fetch(`${BASE_URL}/cities/${id}`)
             const data=await res.json();
             setCurrentCity(data);
           }catch{
             alert('There is an error loading data...')
           }finally{
             setIsLoading(false)
           }
        }
    

    return<CityContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        getCity,
    }}>
        {children}
    </CityContext.Provider>
}

function useCities(){
    const context =useContext(CityContext)
    if (context===undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
    return context

}

export{CitiesProvider ,useCities}