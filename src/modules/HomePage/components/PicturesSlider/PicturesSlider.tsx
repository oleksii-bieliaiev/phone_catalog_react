import {
  useState,
  useEffect,
  useRef,
  useContext,
  FC,
  useCallback,
} from 'react';

import { Link } from 'react-router-dom';
import { Icon } from '../../../shared/Icon';
import { icons } from '../../../../constants/icons.config';
import { GlobalContext } from '../../../../context/GlobalContext';
import { SlideData } from './types/types';
import './PicturesSlider.scss';

const slides: SlideData[] = [
  {
    image: 'img/banners/new_banner_big1.svg',
    imageMobile: 'img/banners/banner_small_1.svg',
    url: 'phones',
  },
  {
    image: 'img/banners/banner2.png',
    imageMobile: 'img/banners/banner2.png',
    url: 'tablets',
  },
  {
    image: 'img/banners/banner1.png',
    imageMobile: 'img/banners/banner1.png',
    url: 'accessories',
  },
];

export const PicturesSlider: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useContext(GlobalContext);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 3500);
  }, [nextSlide]);

  useEffect(() => {
    resetAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoSlide]);

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      resetAutoSlide();
    },
    [resetAutoSlide],
  );

  const handleNextClick = useCallback(() => {
    nextSlide();
    resetAutoSlide();
  }, [nextSlide, resetAutoSlide]);

  const handlePrevClick = useCallback(() => {
    prevSlide();
    resetAutoSlide();
  }, [prevSlide, resetAutoSlide]);

  return (
    <div className="picturesSlider">
      <div className="picturesSlider__container">
        <div className="picturesSlider__button" onClick={handlePrevClick}>
          <Icon icon={icons.arrow_left[theme]} />
        </div>

        <div className="picturesSlider__content">
          <div className="picturesSlider__container-image">
            {slides.map((slide, index) => {
              const isActive = currentSlide === index;

              const imageElement = (
                <picture>
                  <source
                    media="(max-width: 1024px)"
                    srcSet={slide.imageMobile || slide.image}
                  />
                  <img
                    src={slide.image}
                    alt="Slide"
                    className={
                      isActive
                        ? 'picturesSlider__image picturesSlider__image--active'
                        : 'picturesSlider__image'
                    }
                  />
                </picture>
              );

              return isActive ? (
                <Link to={slide.url} key={index}>
                  {imageElement}
                </Link>
              ) : (
                <div key={index} style={{ display: 'none' }}>
                  {imageElement}
                </div>
              );
            })}
          </div>
        </div>

        <div className="picturesSlider__button" onClick={handleNextClick}>
          <Icon icon={icons.arrow_right[theme]} />
        </div>
      </div>

      <div className="picturesSlider__dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={
              currentSlide === index
                ? 'picturesSlider__dot picturesSlider__dot--active'
                : 'picturesSlider__dot'
            }
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
