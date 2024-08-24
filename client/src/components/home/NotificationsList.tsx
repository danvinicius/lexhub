import "./NotificationsList.scss";
import ChevronRight from '../../assets/icon/ChevronRight.svg'

const NotificationsList = () => {
  return (
    <section className="notificationsListContainer">
      <div className="notificationsListContainerHeader">
        <h2>Últimas atualizações</h2>
      </div>
      <ul className="notificationsList">
        <li>
          <div className="notification">
            <div className="notificationContent">
              <p className="notificationDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
              <img src={ChevronRight} alt="" />
          </div>
        </li>
        <li>
          <div className="notification">
            <div className="notificationContent">
              <p className="notificationDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
              <img src={ChevronRight} alt="" />
          </div>
        </li>
        <li>
          <div className="notification">
            <div className="notificationContent">
              <p className="notificationDescription">
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

export default NotificationsList;
