const Iframe = (props) => {
    const { item } = props;

    return (
        <div className="max-w-screen-2xl mx-auto w-11/12 space-y-3">
            <h3 className="mt-812:text-3xl text-2xl font-medium tracking-wide text-gray-300">
                {item.name} - {item.type}
            </h3>
            <div>
                <iframe
                    width="100%"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    allow
                    title="YouTube video player"
                    frameborder="0"
                    allowFullScreen="true"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style={{ height: `calc(50/100 * 100vw)` }}
                ></iframe>
            </div>
        </div>
    );
};

export default Iframe;
