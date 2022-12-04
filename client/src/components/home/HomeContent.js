/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetPrivatePostQuery } from '../../features/addPost/PostApi';
import HomePostCard from './HomePostCard';

export default function HomeContent() {
    const [postData, setPostData] = useState([]);

    const { email } = useSelector((state) => state.auth);
    const { data } = useGetPrivatePostQuery(email);

    const settingData = (value) => {
        let modified = [];

        if (value) {
            value.forEach((post) => {
                if (post?.posts) {
                    modified = [...modified, ...post?.posts];
                }
            });

            setPostData(modified);
        }
    };
    useEffect(() => {
        if (data?.success) {
            settingData(data?.message);
        }
    }, [email, data]);

    return (
        <div className="container min-vh-100" id="content-left">
            <div className="container-fluid" id="inner-content">
                <h5 className="ms-5">Recent Post</h5>
                {/* <!-- All Cards --> */}
                <div className="container-fluid d-grid gap-5 mt-5">
                    {postData.map((post) => (
                        <HomePostCard key={post._id} contents={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
