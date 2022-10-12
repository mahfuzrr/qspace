import parse from 'html-react-parser';

export default function HomePostCard({ contents }) {
    const convertDate = (date) => {
        const newDate = new Date(date);
        return newDate;
    };

    return (
        <div className="container home-post-card">
            <div className="container-fluid d-flex card-upper">
                <div className="container">
                    <h6>{contents?.title}</h6>
                    <p className="mb-4" id="home-post-author">
                        By {contents?.writter},{' '}
                        {Math.floor(Math.abs(Date.now() - convertDate(contents?.postedOn)) / 36e5)}{' '}
                        hours ago <i className="fa-solid fa-user-group ms-1 isroom" />
                    </p>
                </div>
                <span className="bookmark">
                    <i className="fa-regular fa-bookmark" />
                </span>
            </div>

            {/* <!-- mid section --> */}
            <div className="container-fluid card-mid px-4 py-1">{parse(contents?.content)}</div>

            {/* <!-- lower section --> */}
            <div className="container-fluid card-lower">
                <span>
                    More <i className="fa-solid fa-right-long" />
                </span>
            </div>
        </div>
    );
}
