import { Months } from "@/models/target";

// months
export const months = {
  january: {
    index: 0,
    name: "يناير",
  },
  february: {
    index: 1,
    name: "فبراير",
  },
  march: {
    index: 2,
    name: "مارس",
  },
  april: {
    index: 3,
    name: "ابريل",
  },
  may: {
    index: 4,
    name: "مايو",
  },
  june: {
    index: 5,
    name: "يونيو",
  },
  july: {
    index: 6,
    name: "يوليو",
  },
  august: {
    index: 7,
    name: "اغسطس",
  },
  september: {
    index: 8,
    name: "سبتمبر",
  },
  october: {
    index: 9,
    name: "اكتوبر",
  },
  november: {
    index: 10,
    name: "نوفمبر",
  },
  december: {
    index: 11,
    name: "ديسمبر",
  },
};

// quarters

export function getQuarter(month: Months) {
  switch (month) {
    case "january":
    case "february":
    case "march":
      return quarters.q1;

    case "april":
    case "may":
    case "june":
      return quarters.q2;

    case "july":
    case "august":
    case "september":
      return quarters.q3;

    case "october":
    case "november":
    case "december":
      return quarters.q4;

    default:
      return null;
  }
}

const quarters = {
  q1: {
    months: [0, 1, 2],
    name: "الربع الاول",
    index: 0,
  },
  q2: {
    months: [3, 4, 5],
    name: "الربع الثاني",
    index: 1,
  },
  q3: {
    months: [6, 7, 8],
    name: "الربع الثالث",
    index: 2,
  },
  q4: {
    months: [9, 10, 11],
    name: "الربع الرابع",
    index: 3,
  },
};

// thirds

export type Third = {
  index: number;
  name: string;
  start: number;
  end: number;
};
export function getThird(month: Months, day: number) {
  return thirds[month].find((t) => t.start <= day && t.end >= day)!;
}

export const thirds = {
  january: [
    {
      index: 0,
      name: "يناير - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 1,
      name: "يناير - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 2,
      name: "يناير - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
  february: [
    {
      index: 3,
      name: "فبراير - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 4,
      name: "فبراير - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 5,
      name: "فبراير - التوريدة الثالثة",
      start: 21,
      end: 28,
    },
  ],
  march: [
    {
      index: 6,
      name: "مارس - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 7,
      name: "مارس - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 8,
      name: "مارس - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
  april: [
    {
      index: 9,
      name: "ابريل - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 10,
      name: "ابريل - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 11,
      name: "ابريل - التوريدة الثالثة",
      start: 21,
      end: 30,
    },
  ],
  may: [
    {
      index: 12,
      name: "مايو - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 13,
      name: "مايو - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 14,
      name: "مايو - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
  june: [
    {
      index: 15,
      name: "يونيو - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 16,
      name: "يونيو - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 17,
      name: "يونيو - التوريدة الثالثة",
      start: 21,
      end: 30,
    },
  ],
  july: [
    {
      index: 18,
      name: "يوليو - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 19,
      name: "يوليو - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 20,
      name: "يوليو - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
  august: [
    {
      index: 21,
      name: "اغسطس - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 22,
      name: "اغسطس - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 23,
      name: "اغسطس - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
  september: [
    {
      index: 24,
      name: "سبتمبر - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 25,
      name: "سبتمبر - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 26,
      name: "سبتمبر - التوريدة الثالثة",
      start: 21,
      end: 30,
    },
  ],
  october: [
    {
      index: 27,
      name: "اكتوبر - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 28,
      name: "اكتوبر - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 29,
      name: "اكتوبر - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
  november: [
    {
      index: 30,
      name: "نوفمبر - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 31,
      name: "نوفمبر - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 32,
      name: "نوفمبر - التوريدة الثالثة",
      start: 21,
      end: 30,
    },
  ],
  december: [
    {
      index: 33,
      name: "ديسمبر - التوريدة الاولى",
      start: 1,
      end: 10,
    },
    {
      index: 34,
      name: "ديسمبر - التوريدة الثانية",
      start: 11,
      end: 20,
    },
    {
      index: 35,
      name: "ديسمبر - التوريدة الثالثة",
      start: 21,
      end: 31,
    },
  ],
};
