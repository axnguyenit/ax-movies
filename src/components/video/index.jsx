export default function Video({ src }) {
  return (
    <div
      className="relative w-full duration-200 rounded-md overflow-hidden"
      style={{ paddingBottom: '55%' }}
    >
      <iframe
        title={src}
        className="absolute top-0 left-0 w-full h-full z-10"
        src={src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
