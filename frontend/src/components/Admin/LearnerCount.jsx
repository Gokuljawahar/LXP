import React, { useEffect } from 'react'
import { FaUserGraduate } from 'react-icons/fa';
import { getTotalLearners } from '../../features/admin/api/dashboardApi';
import useAsyncRequest from '../../hooks/useAsyncRequest';

function LearnersCount() {
    const { data: count, error, isLoading, run: fetchData } = useAsyncRequest(getTotalLearners, 0);

    useEffect(() => {
        fetchData().catch((requestError) => {
            console.error('Error fetching new learner count:', requestError);
        });
    }, [fetchData]);

    return (
        <div>
            <FaUserGraduate size={30} />
            <h5 className="card-title">Number of Learners</h5>
            {isLoading && <p className="card-text">Loading...</p>}
            {!isLoading && error && <p className="card-text">Unable to load learner count.</p>}
            {!isLoading && !error && <p className="card-text">Count: <span id="learnerCount">{count}</span></p>}
        </div>
    )
}

export default LearnersCount
