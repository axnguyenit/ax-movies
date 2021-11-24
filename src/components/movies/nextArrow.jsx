const NextArrow = (props) => (
    <div
        onClick={props.onClick}
        className="mt-1024:opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 right-3 w-7 h-16 flex items-center justify-center cursor-pointer rounded hover:opacity-70 duration-300 bg-penetration-5"
    >
        <svg
            width="150"
            height="150"
            viewBox="0 0 24 24"
            className="fill-current text-gray-300 hover:text-gray-500 duration-200"
        >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
    </div>
);

export default NextArrow;
