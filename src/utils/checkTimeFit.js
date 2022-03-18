export default function checkTimeFit(time, movie, showTimes) {
    const { length } = movie;
    const start = getBegining(time);
    for (let i = 0; i < showTimes.length; i++) {
        const begin = getBegining(showTimes[i].time);
        const ongoingMovieLength = showTimes[i].movie.length;
        if (begin === start) return false;
        if (start <= begin) {
            if (start + length >= begin) return false;
        };
        if (start > begin) {
            if (begin + ongoingMovieLength >= start) return false;
        };
        if (start + length > 1440) {
            const remaining = start + length - 1440;
            if (remaining > begin) return false;
        };
    }
    return true;
}

function getBegining(time) {
    const hours = +time.slice(0, 2) * 60;
    const mins = +time.slice(3, 5);
    return hours + mins;
}