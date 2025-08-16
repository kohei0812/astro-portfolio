import { useEffect, useState } from 'react';
export default function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://kouhei-test.com/dynamis/wp-json/wp/v2/posts?_embed')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);
    return (
        <section className="work-archive-section post" id="work-archive-section">
            <div className="container">
                <h2 className="work-archive-ttl post"><p>一般企業様</p></h2>
                <ul className="work-archive-list post">
                    {posts.map(post => {
                        const thumbnail =
                            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default.jpg'; // fallback if missing
                        return (
                            <li key={post.id} className="work-archive-item">
                                <article>
                                    <a href={`/posts/${post.slug}/`}>
                                        <figure className="work-archive-item__thumb">
                                            <img
                                                width="200"
                                                height="100"
                                                loading="lazy"
                                                decoding="async"
                                                src={thumbnail} alt={post.title.rendered.replace(/<[^>]*>/g, '') || 'サムネイル画像'} />
                                            <figcaption className="visually-hidden" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        </figure>
                                        {post._embedded?.['wp:term']?.[0]?.length > 0 && (
                                            <div className="work-archive-item__cat">
                                                {post._embedded['wp:term'][0].map((cat) => (
                                                    <small key={cat.id}><span>{cat.name}</span></small>
                                                ))}
                                            </div>
                                        )}
                                        <h3
                                            className="work-archive-item__ttl"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                    </a>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}