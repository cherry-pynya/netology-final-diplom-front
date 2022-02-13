import { nanoid } from "nanoid";

export const initialDates = [
  // список доступных дат должен приходить с сервера
  {
    weekDay: "Пн",
    date: 31,
    weekEnd: false,
    active: true,
  },
  {
    weekDay: "Вт",
    date: 1,
    weekEnd: false,
    active: false,
  },
  {
    weekDay: "Ср",
    date: 2,
    weekEnd: false,
    active: false,
  },
  {
    weekDay: "Чт",
    date: 3,
    weekEnd: false,
    active: false,
  },
  {
    weekDay: "Пт",
    date: 4,
    active: false,
    weekEnd: false,
  },
  {
    weekDay: "Сб",
    date: 5,
    active: false,
    weekEnd: true,
  },
];

//список фильмов который должен приходить с сервера
export const initialMovies = [
  {
    id: nanoid(),
    alt: "Звёздные войны постер",
    src: "poster1",
    name: "Звёздные войны XXIII: Атака клонированных клонов",
    desc: "Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.",
    duration: 130,
    origin: "США",
    halls: [
      {
        number: 1,
        avalible: [
          {
            id: nanoid(),
            time: "10:20",
          },
          {
            id: nanoid(),
            time: "14:10",
          },
          {
            id: nanoid(),
            time: "18:40",
          },
          {
            id: nanoid(),
            time: "22:00",
          },
        ],
      },
      {
        number: 1,
        avalible: [
          {
            id: nanoid(),
            time: "10:20",
          },
          {
            id: nanoid(),
            time: "14:10",
          },
          {
            id: nanoid(),
            time: "18:40",
          },
          {
            id: nanoid(),
            time: "22:00",
          },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    alt: "Альфа постер",
    src: "poster2",
    name: "Альфа",
    desc: "20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.",
    duration: 96,
    origin: "Франция",
    halls: [
      {
        number: 1,
        avalible: [
          {
            id: nanoid(),
            time: "10:20",
          },
          {
            id: nanoid(),
            time: "14:10",
          },
          {
            id: nanoid(),
            time: "18:40",
          },
          {
            id: nanoid(),
            time: "22:00",
          },
        ],
      },
      {
        number: 1,
        avalible: [
          {
            id: nanoid(),
            time: "10:20",
          },
          {
            id: nanoid(),
            time: "14:10",
          },
          {
            id: nanoid(),
            time: "18:40",
          },
          {
            id: nanoid(),
            time: "22:00",
          },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    alt: "Хищник постер",
    src: "poster2",
    name: "Хищник",
    desc: "Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.",
    duration: 101,
    origin: "Канада, США",
    halls: [
      {
        number: 1,
        avalible: [
          {
            id: nanoid(),
            time: "10:20",
          },
          {
            id: nanoid(),
            time: "14:10",
          },
          {
            id: nanoid(),
            time: "18:40",
          },
          {
            id: nanoid(),
            time: "22:00",
          },
        ],
      },
      {
        number: 1,
        avalible: [
          {
            id: nanoid(),
            time: "10:20",
          },
          {
            id: nanoid(),
            time: "14:10",
          },
          {
            id: nanoid(),
            time: "18:40",
          },
          {
            id: nanoid(),
            time: "22:00",
          },
        ],
      },
    ],
  },
];

export const initialReservation = {
  id: nanoid(),
  name: 'Звёздные войны XXIII: Атака клонированных клонов',
  seats: [6, 7],
  row: 4,
  hall: 1,
  cost: 600,
  time: '18:30',
  date: '09.02.2022'
}
