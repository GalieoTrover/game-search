/* swipper imports */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Carousel({ gameData, latestGames }) {
  let swiperData = latestGames.results.slice(1, 6);
  // console.log(swiperData);
  swiperData.map(function (game, id) {
    if (id === game.id) console.log(game);
    return null;
  });
  //   let swiperData = gameData.slice(0, 5);
  //   console.log(latestGames.results.slice(0, 5));
  //   console.log(swiperData);
  //   let genresArr = [];
  //   let eachGenre = [];
  //   swiperData.map((game) => console.log(game.genres[2].name));
  //   //   genresArr.map((genre) => console.log(genre[0].name));
  //   for (let i = 0; i < genresArr.length; i++) {
  //     for (let j = 0; j < genresArr[i].length; j++) {
  //       eachGenre.push(genresArr[i][j].name);
  //     }
  //   }
  //   console.log(eachGenre.slice(0, 3));
  //   console.log(genresArr);
  //   swiperData.map((game) => (genresArr = game.genres.slice(0, 3)));
  //   genresArr.map((genre) => console.log(genre.name));
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
    >
      {swiperData.map((game) => (
        <SwiperSlide>
          <div
            className="carousel-img"
            style={{ backgroundImage: `url(${game.background_image})` }}
          ></div>
          <div className="overlay">
            <div className="overlay-content">
              <div className="overlay-content-head">
                <h3 className="overlay-content--title">{game.name}</h3>
                {game.metacritic && (
                  <span className="overlay-content--metacritic">
                    {game.metacritic}
                  </span>
                )}
              </div>
              <div className="overlay-content--details">
                <div className="details details-release">
                  <span className="details-info">Release Date:</span>
                  <span>{game.released}</span>
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
