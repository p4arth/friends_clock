export function parseDates(dateStr){
    const dateParts = dateStr.split("/");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    const months = ["January", "February", "March", "April", 
                    "May", "June", "July", "August", "September",
                    "October", "November", "December"];
    const monthName = months[month - 1];
    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
}

// export function getDayOfMonth(dateStr){
//     const dateParts = dateStr.split('/');
//     // console.log(dateParts);
//     const year = dateParts[2].split(',')[0];
//     const month = dateParts[1] - 1;
//     const day = dateParts[0];
//     const timeStr = dateParts[2].split(",")[1].slice(1,);
//     const hour = timeStr.split(':')[0];
//     const minute = timeStr.split(':')[1];
//     const second = timeStr.split(':')[2];
//     const date = new Date(year, month, day, hour, minute, second);
//     const dayOfMonth = date.getDate();
//     // console.log(dayOfMonth);
//     return dayOfMonth;
// }