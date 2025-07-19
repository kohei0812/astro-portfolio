import { useEffect, useState, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export default function LeftWork() {
  const [posts, setPosts] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch('https://kouhei-test.com/dynamis/wp-json/wp/v2/posts?_embed')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    if (posts.length > 0 && sliderRef.current) {
      new Swiper(sliderRef.current, {
        direction: 'vertical',
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }
  }, [posts]);

  return (
    <div className="works-archive__item left swiper" ref={sliderRef}>
      <ul className="slider left swiper-wrapper">
        {posts.map(post => {
          const thumbnail =
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default.jpg'; // fallback if missing

          return (
            <li key={post.id} className="slider-item swiper-slide">
              <a href="#" className="slider-link">
                <div className="slider-link__thumb">
                  <img src={thumbnail} alt="サムネイル画像" />
                </div>
                {post._embedded?.['wp:term']?.[0]?.length > 0 && (
                  <div className="slider-link__cat">
                    {post._embedded['wp:term'][0].map((cat) => (
                      <small key={cat.id}><span>{cat.name}</span></small>
                    ))}
                  </div>
                )}
                <h3
                  className="slider-link__ttl"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
