import { useRouter } from "next/router";
import useUserFromUserId from "src/hooks/useUserFromUserId";
import Main from "src/layout/Main";

interface User {
  name: string
}

interface Profile extends User {
  bio: string
  photo: string
}

const Profile = () => {
  const { query } = useRouter();
  const { userId } = query;
  const { user } = useUserFromUserId({ userId: userId?.toString() });
  if (!user) {
    return (
      <Main> User not found </Main>
    )
  }
  return (
    <Main>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={user.profile.photo} alt="Profile Pic" /></figure>
        <div className="card-body">
          <h2 className="card-title">{user.name}</h2>
          <p>{user.profile.bio}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Profile;
