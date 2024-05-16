import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase.js'
import { useDispatch } from "react-redux"
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice.js"

const Profile = () => {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const dispatch = useDispatch();
 
  useEffect(()=> {
    if (image) {
      handleFileUpload (image) 
    }
  },[image])

  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },

    (error)=> {
      setImageError(true);
    },
    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({...formData, profilePicture: downloadURL})
      });
    })
}
 const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value})
}
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    dispatch(updateUserStart())
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), 
    })
    const data = await res.json()

    if (data.success === false) {
      dispatch(updateUserFailure(data))
      return;
    }
    dispatch(updateUserSuccess(data))
    setUpdateSuccess(true)
  } catch (error) {
    dispatch(updateUserFailure(error))
  }
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center m-y-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file"  ref={fileRef} hidden accept="image/*" onChange={(e)=> setImage(e.target.files[0])}/>

        <img src={formData.profilePicture || currentUser.profilePicture} alt="profile" 
          className="h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2" onClick={() => fileRef.current.click()}/>
        {/* Firebase Storage rules
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
      <p className="text-sm self-center">
         {imageError ? ( <span className="text-red-700">Error uploading image(file size must be less that 2MB) </span>) : imagePercent > 0  && imagePercent < 100 ? (<span className="text-slate-700">{`Uploading: ${imagePercent}% `}</span>) : imagePercent === 100 ? (<span className="text-green-700">Done ✅</span>) : ''}
      </p>

        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded- p-3" onChange={handleChange} />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded- p-3" onChange={handleChange} />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded- p-3" onChange={handleChange} />
        <button className="p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-80">{loading ? 'loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'} </p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User updated successfully'} </p>
    </div>
  ) 
}

export default Profile