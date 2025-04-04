import dayjs from "dayjs";

function generateSlots() {
  const slots = [];
  const daysToGenerate = 30;

  const startHour = 10; 
  const endHour = 17;   

  for (let i = 0; i < daysToGenerate; i++) {
    const dayjsDate = dayjs().add(i, 'day');
    const date = dayjsDate.format('YYYY-MM-DD');
    const day = dayjsDate.format('dddd');

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push({ date, day, time });
      }
    }
  }

  return slots;
}

export { generateSlots };
