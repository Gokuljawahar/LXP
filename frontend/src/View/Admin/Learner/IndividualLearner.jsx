import ProfileCard from "../../../components/Admin/ProfileCard";
import Grid from '@mui/material/Grid';
import ProfileEnrolledCourses from "../../../components/Admin/ProfileEnrolledCourses";
import LastEnrolledCourse from "../../../components/Admin/LastEnrolledCourse";
import '../../../Styles/Admin/IndividualLearner.css';
export function IndividualLearner() {
    return (
        <>
            <div id="individualLearner">
                <div id="profileCardView">
                    <div id="profileCard">
                        <ProfileCard />
                    </div>
                    <div id="profileEnrolledCourses">
                        <ProfileEnrolledCourses />
                    </div>
                </div>
               
            </div>
        </>
    )
}