import { Receipt } from "@/models";
import { Months, Target, TargetData } from "@/models/target";
import dayjs from "dayjs";
import { getQuarter, getThird, months, Third, thirds } from "./TargetConstants";

function shapeEntries(receipts: Receipt[]) {
  return receipts
    .flatMap((x) => x.entries)
    .map((e) => ({
      ...e,
      time: receipts.find((r) => r.id === e.receipt_id)!.day!.time,
    }));
}

export function createTargetMonths(target: Target, receipts: Receipt[]) {
  const periods: TargetData[] = [];
  const entries = shapeEntries(receipts);

  (Object.keys(target) as Months[]).forEach((key) => {
    const month = months[key];

    if (!month) return;

    const target_percentage = Number(target[key]);
    const target_amount = (target.total * target_percentage) / 100;
    const actual_amount = entries
      .filter((e) => dayjs(e.time).month() === month.index)
      .reduce((acc, curr) => acc + curr.value, 0);
    const actual_percentage = Number(
      ((actual_amount / target_amount) * 100).toFixed(2)
    );

    periods.push({
      name: month.name,
      index: month.index,
      target_percentage,
      target_amount,
      actual_percentage,
      actual_amount,
    });
  });

  return periods;
}

export function createTargetQuarters(target: Target, receipts: Receipt[]) {
  const periods: TargetData[] = [];
  const entries = shapeEntries(receipts);

  let prevQuarterIndex = -1;

  (Object.keys(target) as Months[]).forEach((key) => {
    const quarter = getQuarter(key);

    if (!quarter) return;

    const target_percentage = Number(target[key]);
    const target_amount = (target.total * target_percentage) / 100;
    const actual_amount = entries
      .filter((e) => quarter.months.includes(dayjs(e.time).month()))
      .reduce((acc, curr) => acc + curr.value, 0);
    const actual_percentage = Number(
      ((actual_amount / target_amount) * 100).toFixed(2)
    );

    if (prevQuarterIndex === quarter.index) {
      periods[prevQuarterIndex].actual_percentage += actual_percentage;
      periods[prevQuarterIndex].actual_amount += actual_amount;
      periods[prevQuarterIndex].target_percentage += target_percentage;
      periods[prevQuarterIndex].target_amount += target_amount;
    } else {
      periods.push({
        name: quarter.name,
        index: quarter.index,
        target_percentage,
        target_amount,
        actual_percentage,
        actual_amount,
      });

      prevQuarterIndex = quarter.index;
    }
  });

  return periods;
}

export function createTargetThirds(target: Target, receipts: Receipt[]) {
  const periods: TargetData[] = [];
  const entries = shapeEntries(receipts);

  Object.entries(thirds).forEach(([key, value]) => {
    const month_target = target[key as Months];
    if (!month_target) return;

    value.forEach((third) => {
      const third_entries = entries.filter((e) => {
        const day = dayjs(e.time).date();
        const month = dayjs(e.time).month();
        const monthIndex = months[key as Months].index;

        return day >= third.start && day <= third.end && month === monthIndex;
      });

      const target_percentage = Number(target[key as Months] / 3);
      const target_amount = (target.total * target_percentage) / 100;

      const actual_amount = third_entries.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      const actual_percentage = Number(
        ((actual_amount / target_amount) * 100).toFixed(2)
      );

      periods.push({
        name: third.name,
        index: third.index,
        target_percentage,
        target_amount,
        actual_percentage,
        actual_amount,
      });
    });
  });

  // (Object.keys(target) as Months[]).forEach((key) => {
  //   if (!months[key]) return;

  //   let currentThird: Third | undefined;

  //   const target_percentage = target[key];
  //   const target_amount = (target.total * target_percentage) / 100;

  //   const actual_amount = entries
  //     .filter((e) => {
  //       const third = getThird(key, dayjs(e.time).date());
  //       currentThird = third;
  //     })
  //     .reduce((acc, curr) => acc + curr.value, 0);

  //   const actual_percentage = Number(
  //     ((actual_amount / target_amount) * 100).toFixed(2)
  //   );

  //   periods.push({
  //     name: currentThird!.name,
  //     index: currentThird!.index,
  //     target_percentage,
  //     target_amount,
  //     actual_percentage,
  //     actual_amount,
  //   });
  // });

  return periods;
}
