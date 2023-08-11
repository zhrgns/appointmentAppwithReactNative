function parseDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
}

export function sortAppointmentsByDateAndTime(appointmentList) {
    return appointmentList.slice().sort((a, b) => {
        // Tarih karşılaştırması
        const dateComparison = parseDate(a.bookedDate).getTime() - parseDate(b.bookedDate).getTime();
        if (dateComparison === 0) {
            // Eğer tarihler aynıysa saatlere göre sırala
            return a.bookedTime.localeCompare(b.bookedTime);
        }
        return dateComparison;
    });
}