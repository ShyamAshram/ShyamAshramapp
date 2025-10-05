  export  function getNextDateForDay(dayName: string): Date {
    const dayMap: { [key: string]: number } = {
      'Domingo': 0,
      'Lunes': 1,
      'Martes': 2,
      'Miércoles': 3,
      'Jueves': 4,
      'Viernes': 5,
      'Sábado': 6,
    };

    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = dayMap[dayName];
    console.log('targetDay', targetDay);

  
    let diff = targetDay - todayDay;
    if (diff <= 0) diff += 7; 
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + diff);
    nextDate.setHours(0, 0, 0, 0); 
    return nextDate;
  }