import { useRouter } from "next/router";
import useUserFromUserId from "src/hooks/useUserFromUserId";
import Main from "src/layout/Main";

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

// {"id":"76ddb643-0002-48cb-98a2-790db42e010a","email":"avirajkhare00@gmail.com","name":"Aviraj Khare","block":8,"profile":{"id":"326fe59c-e87f-4138-ab34-dca893873a50","createdAt":"2024-01-17T23:15:29.056Z","updatedAt":"2024-01-18T09:26:58.257Z","userId":"76ddb643-0002-48cb-98a2-790db42e010a","bio":"I go by the username avirajkhare00","photo":"https://avatars.githubusercontent.com/u/49766964?v=4","twitter":null,"website":null,"city":null,"affiliation":null,"affliationDescription":null}}
