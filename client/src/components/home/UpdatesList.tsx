import "./UpdatesList.scss";
import ChevronRight from '../../assets/icon/ChevronRight.svg'

const UpdatesList = () => {
  return (
    <section className="updatesListContainer">
      <div className="updatesListContainerHeader">
        <h2>Últimas atualizações</h2>
      </div>
      <ul className="updatesList">
        <li>
          <div className="update">
            <div className="updateContent">
              <p className="updateDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
              <img src={ChevronRight} alt="" />
          </div>
        </li>
        <li>
          <div className="update">
            <div className="updateContent">
              <p className="updateDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
              <img src={ChevronRight} alt="" />
          </div>
        </li>
        <li>
          <div className="update">
            <div className="updateContent">
              <p className="updateDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
              <img src={ChevronRight} alt="" />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default UpdatesList;
