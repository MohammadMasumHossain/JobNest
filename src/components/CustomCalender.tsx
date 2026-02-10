import useCalendar from "@/hooks/useCalendar";
import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  locale?: string;
};

const CustomCalender: React.FC<Props> = ({
  value,
  onChange,
  locale = navigator.language,
}) => {
  const {
    year,
    month,
    weekdays,
    cells,

    goNext,
    goPrev,
  } = useCalendar(value ?? new Date(), locale);

  const monthFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    });
  }, [locale]);

  const isSelected = (date: Date) =>
    value &&
    date.getFullYear() === value.getFullYear() &&
    date.getMonth() === value.getMonth() &&
    date.getDate() === value.getDate();

  return (
    <div className="w-105 p-6 bg-linear-to-br from-orange-50 via-white to-amber-50 border border-orange-200 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <button onClick={goPrev}>←</button>
        <div className="font-bold text-lg text-orange-700">
          {monthFormatter.format(new Date(year, month, 1))}
        </div>
        <button onClick={goNext}>→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm text-orange-600 mb-2">
        {weekdays.map((d) => (
          <div key={d} className="text-center font-medium">
            {d}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="grid grid-cols-7 gap-1"
        >
          {cells.map(({ date, currentMonth }) => {
            const selected = isSelected(date);

            return (
              <button
                type="button"
                key={date.toISOString()}
                onClick={() => onChange(date)}
                className={`
                  aspect-square rounded-md flex items-center justify-center
                  ${currentMonth ? "bg-white text-gray-800" : "bg-gray-100 text-gray-400"}
                  ${
                    selected
                      ? "bg-linear-to-br from-orange-500 to-amber-500 text-white scale-105 shadow-md"
                      : "hover:bg-orange-100 hover:text-orange-700"
                  }
                `}
              >
                <div>
                  <span className="text-sm font-medium">{date.getDate()}</span>
                </div>
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CustomCalender;
