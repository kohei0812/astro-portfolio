import { useEffect, useState, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules'; 
import 'swiper/css';

export default function LeftWork() {
  const [posts, setPosts] = useState([]);
  const sliderRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    fetch('https://kouhei-test.com/dynamis/wp-json/wp/v2/posts?_embed')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);
  
  // Swiper初期化処理（direction変更対応）
  const initSwiper = () => {
    if (!sliderRef.current) return;

    const isMobile = window.innerWidth <= 768;
    // 既存インスタンス破棄
    if (swiperInstance.current) {
      swiperInstance.current.destroy(true, true);
    }

    // 新規インスタンス作成
    swiperInstance.current = new Swiper(sliderRef.current, {
      direction: isMobile ? 'horizontal' : 'vertical',
      loop: true,
      modules: [Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  };

  // 初回・リサイズ時に Swiper 再構築
  useEffect(() => {
    if (posts.length > 0) {
      initSwiper();
      window.addEventListener('resize', initSwiper);
      return () => window.removeEventListener('resize', initSwiper);
    }
  }, [posts]);

  return (
    <div className="works-archive__item left swiper" ref={sliderRef}>
      <div className="slider left swiper-wrapper">
        {posts.map(post => {
          const thumbnail =
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default.jpg'; // fallback if missing

          return (
            <div key={post.id} className="slider-item swiper-slide">
              <a href="#" className="slider-link">
                 {post._embedded?.['wp:term']?.[0]?.length > 0 && (
                  <div className="slider-link__cat sp_only">
                    {post._embedded['wp:term'][0].map((cat) => (
                      <small key={cat.id}><span>{cat.name}</span></small>
                    ))}
                  </div>
                )}
                <h3
                  className="slider-link__ttl sp_only"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="slider-link__thumb">
                  <img src={thumbnail} alt="サムネイル画像" />
                </div>
                {post._embedded?.['wp:term']?.[0]?.length > 0 && (
                  <div className="slider-link__cat pc_only">
                    {post._embedded['wp:term'][0].map((cat) => (
                      <small key={cat.id}><span>{cat.name}</span></small>
                    ))}
                  </div>
                )}
                <h3
                  className="slider-link__ttl pc_only"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
