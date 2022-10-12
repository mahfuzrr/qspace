import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

export default function RoomPostCard({ content }) {
    const [isMore, setMore] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (content?.content) {
            let cont = content?.content;
            if (cont.length > 200) {
                cont = cont.slice(0, 200);
                setDescription(`${cont}<span> ...</span>`);
            } else {
                setDescription(cont);
            }
        }
    }, [content]);

    return (
        <div className="container-fluid" id="room-post-cards">
            <div className="container-fluid position-relative" id="room-post-single-card">
                {/* <!-- User --> */}
                <div className="container-fluid d-flex align-items-center" id="room-user">
                    <span id="room-user-avatar">
                        <i className="fa-solid fa-user fs-4" />
                    </span>
                    <div className="container" id="room-user-info">
                        <p className="m-0">{content?.writter}</p>
                        <p className="m-0">Posted on {content?.postedOn}</p>
                    </div>
                </div>
                {/* <!-- User --> */}

                {/* <!-- Post Description --> */}
                <div
                    className="container-fluid"
                    id="room-post-description"
                    role="presentation"
                    onClick={() => setMore(!isMore)}
                >
                    <h5 className="mb-4 p-1">{content?.title}</h5>
                    <div className="m-0 p-1">
                        {isMore ? parse(content?.content) : parse(description)}
                    </div>
                </div>
                {/* <!-- Post Description --> */}
                <div className="container-fluid d-flex justify-content-end">
                    <span
                        className="m-0"
                        id="room-see-more"
                        role="presentation"
                        onClick={() => setMore(!isMore)}
                    >
                        Read {isMore ? 'less' : 'more'}
                        <i className="fa-solid fa-arrow-right ms-2" />
                    </span>
                </div>
            </div>
        </div>
    );
}
