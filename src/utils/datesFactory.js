import moment from "moment";
import 'moment/locale/ru';

export default function datesFactory() {
    const arr = [];
    for (let i = 0; i <= 6; i++) {
        const day = moment().add(i, 'days');
        const obj = {
            weekDay: day.format('llll').slice(0, 2).toUpperCase(),
            date: day.date(),
            fullDate: day.format('L'),
            weekEnd: false,
            active: false,
        }
        if (i === 0) {
            obj.active = true;
        }
        if (obj.weekDay === 'СБ' || obj.weekDay === 'ВС') {
            obj.weekEnd = true;
        }
        arr.push(obj)
    }
    return arr;
};
