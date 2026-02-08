// import pagenotfoud from '../../assets/Admin/Images/404_page_cover.jpg';
import pagenotfoud from '../../assets/Admin/Images/404 Error.gif';
import '../../Styles/Admin/Pagenotfound.css'
function PageNotFound(){
    return (
      <>
        <div className="pagenotfound">
          <img src={pagenotfoud}></img>
        </div>
      </>
    );
}

export default PageNotFound;