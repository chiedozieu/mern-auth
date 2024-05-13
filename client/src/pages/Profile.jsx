import { useSelector } from "react-redux"

const Profile = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center m-y-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.profilePicture} alt="profile" 
          className="h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2"
        />
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded- p-3" />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded- p-3" />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded- p-3" />
        <button className="p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  ) 
}

export default Profile