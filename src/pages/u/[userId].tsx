import { useRouter } from "next/router";
import useUser from "src/hooks/useUser";
import Main from "src/layout/Main";

const Profile = () => {
  const { query } = useRouter();
  const { userId } = query;
  const {user} = useUser({ userId: userId?.toString() });
  if (!user) {
    return (
      <Main> User not found </Main>
    )
  }
  return (
    <Main>
      <div className="p-5">
      <div>
      {user.name}
      </div>
      <div>
        {JSON.stringify(user)}
      </div>
      </div>

    </Main>
  )
}

export default Profile;