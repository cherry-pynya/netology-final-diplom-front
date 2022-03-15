export default function giveMeTheShow(halls, movies, showTimes) {
    showTimes.forEach((el) => {
        const { hall, movie } = el;
        el.hall = halls.find((item) => item._id === hall); 
        el.movie = movies.find((item) => item._id === movie); 
    });
    return showTimes;
}