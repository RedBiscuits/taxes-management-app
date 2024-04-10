import { Receipt } from "@/lib/models";
import { Months, Target } from "@/lib/models/target";
import dayjs from "dayjs";
import { getQuarter, getThird, months } from "./TargetConstants";

function shapeEntries(receipts: Receipt[]) {
  return receipts
    .flatMap((r) => r.entries)
    .map((e) => ({
      ...e,
      time: receipts.find((r) => r.id === e.receipt_id)!.day!.time,
    }));
}

export function getCurrentYearTarget(target: Target, receipts: Receipt[]) {
  const entries = shapeEntries(receipts);

  const target_percentage = Math.trunc(100);
  const target_amount = Math.trunc(target.total);
  const actual_amount = entries.reduce((acc, curr) => acc + curr.value, 0);
  const actual_percentage = (actual_amount / target_amount) * 100;

  return {
    name: "سنوي",
    target_percentage,
    target_amount,
    actual_percentage,
    actual_amount,
  };
}

export function getCurrentMonthTarget(target: Target, receipts: Receipt[]) {
  const entries = shapeEntries(receipts);

  const [monthName, monthData] = Object.entries(months).find(
    ([key, value]) => value.index === dayjs().month()
  )!;

  const target_percentage = Math.trunc(target[monthName as Months]);
  const target_amount = (target.total * target_percentage) / 100;

  const actual_amount = entries
    .filter((e) => dayjs(e.time).month() === dayjs().month())
    .reduce((acc, curr) => acc + curr.value, 0);
  const actual_percentage = (actual_amount / target_amount) * 100;

  return {
    name: monthData.name,
    target_percentage,
    target_amount,
    actual_percentage,
    actual_amount,
  };
}

export function getCurrentQuarterTarget(target: Target, receipts: Receipt[]) {
  const entries = shapeEntries(receipts);

  const [monthName] = Object.entries(months).find(
    ([key, value]) => value.index === dayjs().month()
  )!;

  const quarter = getQuarter(monthName as Months);

  const quarterMonths = Object.entries(months)
    .filter(([key, value]) => quarter.months.includes(value.index))
    .map(([key]) => key as Months);

  const target_percentage = Math.trunc(
    quarterMonths
      .map((key) => target[key])
      .reduce((acc, curr) => acc + Number(curr), 0)
  );
  const target_amount = (target.total * target_percentage) / 100;

  const actual_amount = entries
    .filter((e) => quarter.months.includes(dayjs(e.time).month()))
    .reduce((acc, curr) => acc + curr.value, 0);
  const actual_percentage = (actual_amount / target_amount) * 100;

  return {
    name: quarter.name,
    target_percentage,
    target_amount,
    actual_percentage,
    actual_amount,
  };
}

export function getCurrentThirdTarget(target: Target, receipts: Receipt[]) {
  const entries = shapeEntries(receipts);

  const [monthName] = Object.entries(months).find(
    ([key, value]) => value.index === dayjs().month()
  )!;

  const third = getThird(monthName as Months, dayjs().date());

  const target_percentage = Math.trunc(target[monthName as Months] / 3);
  const target_amount = (target.total * target_percentage) / 100;

  const actual_amount = entries
    .filter(
      (e) =>
        dayjs(e.time).date() >= third.start && dayjs(e.time).date() <= third.end
    )
    .reduce((acc, curr) => acc + curr.value, 0);
  const actual_percentage = (actual_amount / target_amount) * 100;

  return {
    name: third.name,
    target_percentage,
    target_amount,
    actual_percentage,
    actual_amount,
  };
}
