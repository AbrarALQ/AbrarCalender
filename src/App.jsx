import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMosque } from '@fortawesome/free-solid-svg-icons'
import axios from 'redaxios';
import logo1 from './images/logo1.png';
import logo2 from './images/logo2.png';
import Back from './images/Back.jpg';








function App() {


  let time = new Date().toLocaleTimeString()
  const [ctime, setCtime] = useState(time)

  const [data, setData] = useState([]);
  const [hijDate, setHijDate] = useState(null);
  const [geoDate, setGeoDate] = useState(null);
  const [message, setMessage] = useState(null)

  function todayDate () {
    const hijri = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric',
     month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now());
    const geo = new Intl.DateTimeFormat('ar-TN-u-ca', { day: 'numeric' , month: 'long',year : 'numeric'}).format(Date.now());
    
    setHijDate(hijri);
    setGeoDate(geo);
  }

  function updateTime(){
    time = new Date().toLocaleTimeString();
    setCtime(time)
  }

  setInterval(updateTime, 1000);

  function handleError(error) {
    let errorStr;
    switch (error.code) {
      case error.ERR_INTERNET_DISCONNECTED:
        errorStr = 'يرجى التأكد من الاتصال بالانترنت...';
        break;
      case error.TIMEOUT:
        errorStr = 'يرجى تحديث الصفحة';
        break;
      case error.UNKNOWN_ERROR:
        errorStr = 'حدث خطأ غير معروف.';
        break;
      default:
        errorStr = 'حدث خطأ غير معروف.';
    }
    setMessage(errorStr);
  }

  useEffect(() => {
    todayDate();

    axios.get('https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=sa&method=4')
    .then((response) => {
      setData(response.data.data.timings);
   })
   .catch(err => handleError(err))

  }, [])

  return (
    <div className="App">

      <nav className='navbar'>
        <img src={logo1} alt=""/>
        <header className='header'>
        <p style={{textAlign: "center"}}>
   <h2 style={{ color: '#5CDCEA' }}  >تقويم منطقة الرياض </h2>
<h2 style={{ color: '#5CDCEA' }} >Riyadh Calendar </h2>
</p>


</header>

<img src={logo2} alt=""/>
        
        
        
        

      </nav>

      <main>
        
        
       <h3 style={{ fontSize: 27 ,color: '#BA9E38'  }}className='time'> الوقت الأن {time} </h3>


       <h2>    {hijDate} </h2>
       <h2>الموافق {geoDate} </h2>   
      </main>

      
      

<div className="container">
 <article className='prayer-times'>
        <header className='header'>

          <h2>مواقيت الصلاة</h2>
        </header>
  { !message &&   
        <section className='times'>
          <section className='time'>
            <p>الفجر</p>
            <p className='prayer-time'> {data && data.Fajr}</p>
          </section>
          <section className='time'>
            <p>الشروق</p>
            <p>{data && data.Sunrise}</p>
          </section>
          <section className='time'>
            <p>الظهر</p>
            <p className='p'>{data && data.Dhuhr}</p>
          </section>
          <section className='time'>
            <p>العصر</p>
            <p>{data && data.Asr}</p>
          </section>
          <section className='time'>
            <p>المغرب</p>
            <p>{data && data.Maghrib}</p>
          </section>
          <section className='time'>
            <p>العشاء</p>
            <p>{data && data.Isha}</p>
          </section>
          <section className='time'>
            <p>الإمساك</p>
            <p>{data && data.Imsak}</p>
          </section>
        </section>
      }
      {
        message && 
        <p className='loading'>{message}</p>
      }
      </article>
     </div>
     <h4 className='ayah'>إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا</h4>
     


      <footer className='footer'>
    
        <p>تم الانشاء بواسطة القسم التقني  @ {new Date().getFullYear()}</p>

       



      </footer>
     

 
    </div>
  )
}

export default App
