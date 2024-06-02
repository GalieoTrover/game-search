/* swipper imports */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Carousel({ latestGames }) {
  let swiperData = latestGames.results.slice(1, 6);
  swiperData.map(function (game, id) {
    if (id === game.id) console.log(game);
    return null;
  });
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
    >
      {swiperData.map((game, index) => (
        <SwiperSlide key={index}>
          <div
            className="carousel-img"
            style={{ backgroundImage: `url(${game.background_image})` }}
          ></div>
          <div className="overlay">
            <div className="overlay-content">
              <div className="overlay-content-head">
                <h3 className="overlay-content--title">{game.name}</h3>
                {game.metacritic && (
                  <p>
                    Metacritic
                    <span className="overlay-content--metacritic">
                      {game.metacritic}
                    </span>
                  </p>
                )}
              </div>
              <div className="overlay-content--details">
                <div className="details details-release">
                  <span className="details-info">Release Date:</span>
                  <span>{game.released.split("-").reverse().join("/")}</span>
                </div>
                <div className="details details-genres">
                  <span className="details-info">Geners:</span>
                  <div className="genres">
                    <span>Action, Adventure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
