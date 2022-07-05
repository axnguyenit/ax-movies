export default function Iframe({ item }) {
  return (
    <div className="max-w-screen-2xl mx-auto w-11/12 space-y-3">
      <h3 className="mt-812:text-3xl text-2xl font-medium tracking-wide text-gray-300">
        {item.type}
      </h3>
      <div className="overflow-hidden">
        <iframe
          width="100%"
          src={`https://www.youtube.com/embed/${item.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md"
          style={{ height: `calc(50/100 * 100vw)` }}
        />
      </div>
    </div>
  );
}
