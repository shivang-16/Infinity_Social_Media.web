import "./rightsidebar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followUser } from "../../../redux/actions/User";
import { loadUser } from "../../../redux/actions/User";
import User from "../../../components/User/User";

const RightSidebar = () => {
  const {
    user,
    loading: userLoading,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const { users } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    await dispatch(followUser(_id));
    await dispatch(loadUser());
  };
  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);

  return (
    <>
      <div className="right-main">
        <Link to="/profile">
          <div className="rightSidebar-header">
            <div className="userImg">
              <img src={user.avatar?.url} alt="" />
            </div>
            {user ? (
              <div className="userDetail">
                <div className="username">
                  <p>{user.userName}</p>
                </div>
                <div className="name">
                  <p>{user.name}</p>
                </div>
              </div>
            ) : (
              <p>Login first</p>
            )}

            <div className="btn">
              <button>View</button>
            </div>
          </div>
        </Link>
        <div className="rightSidebar-content">
          <div className="content-heading">
            <p>Suggested for you</p>
            <Link to="/connect">
              <p>See all</p>
            </Link>
          </div>
          <div className="content-body">
            {users
              ? users .map((element, index) => {
                  const { name, userName, _id, avatar } = element;
                  return user.userName !== userName ? (
                    <div className="suggestions" key={index}>
                      <User
                        userId={_id}
                        userName={userName}
                        name={name}
                        avatar={avatar?.url}
                      />
                      <div className="btn">
                        <button onClick={() => handleFollow(_id)}>
                          {isAuthenticated && isUserFollowed(_id) ? (
                            <span className="unfollow2">Following</span>
                          ) : (
                            <span className="follow2">Follow</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })
              : "No users found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
