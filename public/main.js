const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp_val');
const temp_status = document.getElementById('temp_status');

const dataHide = document.querySelector('.middle_layer')


const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let days = weekday[currentTime.getDay()];
    const day = document.getElementById('day');
    day.innerText = days;
};
getCurrentDay();
const getCurrentTime = () => {
    var months = new Array(12)
    months[0] = "Jan",
        months[1] = "Feb",
        months[2] = "Mar",
        months[3] = "Apr",
        months[4] = "May",
        months[5] = "June",
        months[6] = "July",
        months[7] = "Aug",
        months[8] = "Sep",
        months[9] = "Oct",
        months[10] = "Now",
        months[11] = "Dec"
    var now = new Date();
    var month = months[now.getMonth()];
    console.log(months[now.getMonth() + 1])
    var date = now.getDate();

    const data = document.getElementById('today_data');
    data.innerText = `${date} ${month}`;
};
getCurrentTime();


const getInfo = async (e) => {
    e.preventDefault();

    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = 'please write the name before search';
        dataHide.classList.add('data_hide');
    }
    else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=67748f75ef74f11f8a1d1526fac3b832`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            console.log(arrData[0].weather[0].main)

            //condition to check sunny or cloudy or clear

            const tempMood = arrData[0].weather[0].main;
            if (tempMood == "Sunny") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rainy") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }
            dataHide.classList.remove('data_hide');
        }
        catch {
            city_name.innerText = 'Please write the correct city name';
            dataHide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getInfo)