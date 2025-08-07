import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Banner() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-96"
      >
        <SwiperSlide>
          <img 
            src="/src/assets/img1.png" 
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img 
            src="/src/assets/img2.png" 
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img 
            src="/src/assets/img3.png" 
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;