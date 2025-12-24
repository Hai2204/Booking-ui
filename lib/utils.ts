import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  const toVND = (value: any) => {
    value = value.toString().replace(/\./g, "");
    const formatted = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "")
      .trim();

    return formatted;
  }
