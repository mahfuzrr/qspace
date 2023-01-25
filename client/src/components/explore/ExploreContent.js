/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useGetPublicCoursesQuery } from '../../features/explore/exploreApi';
import ExploreCard from './ExploreCard';

export default function ExploreContent() {
    const [drop, setDrop] = useState(false);
    const [filterVal, setFilterVal] = useState([]);
    const [allFilter, setAllFilter] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [courses, setCourses] = useState([]);

    const { data } = useGetPublicCoursesQuery();

    const searchSug = [
        'Admission',
        'Algorithm',
        'Math',
        'English',
        'General Knowledge',
        'Quiz',
        'Public',
        'Science',
    ];

    const insertFilterVal = (val, check) => {
        if (check) {
            const temp = [...filterVal];
            temp.push(val);
            setFilterVal(temp);
        } else {
            const temp = [...filterVal];
            const index = temp.indexOf(val);
            if (index >= 0) {
                temp.splice(index, 1);
            }

            setFilterVal(temp);
        }
    };

    const checkVal = () => {
        const temp = [...filterVal];
        setFilterVal([]);
        setAllFilter(temp);
        setDrop(false);
    };

    const clearFilter = () => {
        setAllFilter([]);
        setFilterVal([]);
    };

    const delFilter = (val) => {
        const temp = [...allFilter];
        const temp1 = temp.filter((dt) => dt !== val);
        setAllFilter(temp1);
    };

    useEffect(() => {
        if (data?.success) {
            setCourses(data?.message);
            // console.log(data?.message);
        }
        if (allFilter.length > 0) {
            const temp = [...courses];
            const updatedAra = [];

            for (let i = 0; i < temp.length; i += 1) {
                let sElem = temp[i]?.title;
                sElem = sElem?.toLowerCase();

                for (let j = 0; j < allFilter.length; j += 1) {
                    if (allFilter[j].toLowerCase() === sElem) {
                        updatedAra.push(temp[i]);
                        break;
                    }
                }
            }

            setCourses(updatedAra);
        }
    }, [data, allFilter, searchVal]);

    // const handleFilter = () => {

    // };

    const handleSearch = () => {
        if (searchVal) {
            const temp = [...courses];
            const updatedAra = [];

            for (let i = 0; i < temp.length; i += 1) {
                const sElem = searchVal.toLowerCase();
                let sElem1 = temp[i]?.title;
                sElem1 = sElem1?.toLowerCase();

                console.log(sElem);

                if (sElem === sElem1) {
                    updatedAra.push(temp[i]);
                }
            }

            setCourses(updatedAra);
        }
    };

    return (
        <>
            <div
                className="container position-relative d-flex justify-content-center align-items-center"
                id="explore-search-group"
            >
                <div className="container position-relative" id="explore-search">
                    <input
                        className="form-control"
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search topic"
                    />
                    <i className="fa-solid fa-magnifying-glass search-icon" />
                </div>

                <div className="container search-drop-show" id="search-drop">
                    <ul className="list-group" id="search-drop-list">
                        {searchSug
                            .filter((item) => {
                                const sVal = searchVal.toLowerCase();
                                const itm = item.toLowerCase();

                                return sVal && itm.startsWith(sVal) && sVal !== itm;
                            })
                            .map((item) => (
                                <li
                                    key={v4()}
                                    role="presentation"
                                    onClick={() => setSearchVal(item)}
                                    className="list-group-item"
                                >
                                    {item}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="container" id="explore-filter">
                    <button className="btn" type="button" onClick={() => setDrop(!drop)}>
                        <i className="fa-solid fa-filter me-2" />
                        Filters
                    </button>
                </div>

                <div className="container" id="explore-added-filters">
                    {allFilter.map((filterData) => (
                        <button
                            className="btn explore-filter-btn me-2"
                            type="button"
                            key={v4()}
                            onClick={() => delFilter(filterData)}
                        >
                            {filterData} <i className="fa-solid fa-xmark ms-1" />
                        </button>
                    ))}
                    {allFilter.length > 0 && (
                        <button className="ms-3 filter-cls btn" type="button" onClick={clearFilter}>
                            <i className="fa-solid fa-trash me-1" /> Clear
                        </button>
                    )}
                </div>

                {/* <!-- filter dropdown --> */}
                <div
                    className={`container ${drop ? 'drop-show' : 'drop-hide'}`}
                    id="filter-drop-menu"
                >
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="Math"
                            id="math"
                            checked={filterVal.includes('Math')}
                            onChange={(e) => insertFilterVal(e.target.value, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="math">
                            Math
                        </label>
                    </div>

                    <div className="form-check mt-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="Science"
                            id="science"
                            checked={filterVal.includes('Science')}
                            onChange={(e) => insertFilterVal(e.target.value, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="science">
                            Science
                        </label>
                    </div>

                    <div className="form-check mt-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="English"
                            id="english"
                            checked={filterVal.includes('English')}
                            onChange={(e) => insertFilterVal(e.target.value, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="english">
                            English
                        </label>
                    </div>

                    <div className="form-check mt-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="General Knowledge"
                            id="gk"
                            checked={filterVal.includes('General Knowledge')}
                            onChange={(e) => insertFilterVal(e.target.value, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="gk">
                            General Knowledge
                        </label>
                    </div>

                    <div className="form-check mt-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="Others"
                            id="others"
                            checked={filterVal.includes('Others')}
                            onChange={(e) => insertFilterVal(e.target.value, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="others">
                            Others
                        </label>
                    </div>

                    <button className="btn add-filter-btn mt-2" type="button" onClick={checkVal}>
                        Add filters
                    </button>
                </div>
            </div>

            <div className="container" id="explore-cards">
                <div className="container-fluid row gap-4" id="explore-allCards">
                    {/* <!-- single card --> */}

                    {courses?.map((course) => (
                        <ExploreCard key={course?._id} course={course} />
                    ))}
                </div>
            </div>
        </>
    );
}
