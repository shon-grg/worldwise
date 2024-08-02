/* eslint-disable react/prop-types, no-unused-vars */
import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));



function CityItem({city}) {
  const {currentCity}=useCities()
    const {cityName,emoji,date,id,position}=city

    
    return(
    <li>
    <Link
      className={`${styles.cityItem} ${id===currentCity.is?
         styles['.cityItem--active']:""}`} 
     to={`${id}?lat=${position.lat}&ing=${position.ing}`}>
    
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
    )
}



export default CityItem

