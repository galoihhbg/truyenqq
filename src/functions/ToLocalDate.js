function ToLocalDate(time) {
    // Tạo một đối tượng Date với thời gian UTC
    var utcDate = new Date(time.toString());

    // Chuyển đổi sang giờ địa phương
    var localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000 + 7 * 3600000);

    // In ra ngày
    return `${localDate.getDate().toString().padStart(2, '0')}/${(localDate.getMonth()+1).toString().padStart(2, '0')}/${localDate.getFullYear()}`

}

export default ToLocalDate;