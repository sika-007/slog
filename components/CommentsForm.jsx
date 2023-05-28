import { useState, useEffect, useRef } from "react"
import { submitComment } from "@/services"

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState("")
  const [saveData, setSaveData] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const commentRef = useRef()
  const emailRef = useRef()
  const nameRef = useRef()
  const dataStoreRef = useRef()

  function handleCheckChange(event) {
    if (event.target.checked) {
      setSaveData(true)
      localStorage.setItem("saveData", JSON.stringify(true))
    } else {
      setSaveData(false)
      localStorage.setItem("saveData", JSON.stringify(false))
    }
  }
  
  useEffect(() => {
    commentRef.current.value = ""
  }, [slug])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("saveData"))) {
      setSaveData(true)
      nameRef.current.value = JSON.parse(localStorage.getItem("name"))
      emailRef.current.value = JSON.parse(localStorage.getItem("email"))
    } else {
      dataStoreRef.current.checked = false
      localStorage.removeItem("name")
      localStorage.removeItem("email")
    }
  }, [])

  console.log(saveData)
  
  function handleCommentSubmit(event) {
    event.preventDefault()

    const comment = commentRef.current.value
    const name = nameRef.current.value
    const email = emailRef.current.value
    const storeData = dataStoreRef.current.checked


    const commentObj = { name, email, comment, slug }

    if (!comment || !name || !email) {
      setError("Please fill in all fields")
      setTimeout(() => {
        setError("")
      }, 5000)
      return
    } else {
      setShowLoading(true)
    }

    if (storeData) {
      window.localStorage.setItem("name", JSON.stringify(name));
      window.localStorage.setItem("email", JSON.stringify(email));
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }


    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true)
        setShowLoading(false)
        console.log(res)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 5000)
        commentRef.current.value = ""
      })
      .catch((err) => {
        console.error(err)
        setShowLoading(false)
        setError("Something went wrong! Please try again later")
        setTimeout(() => {
          setError("")
        }, 5000)
      })
  }

  return (
    <form onSubmit={(e) => handleCommentSubmit(e)} className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4"> Leave a Comment </h3>
      <div className="gap-4 mb-4">
        <textarea
          ref={commentRef}
          placeholder="Comment..."
          name="commment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 resize-none"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={nameRef}
          name="name"
          placeholder="Name..."
        />
        <input
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={emailRef}
          name="email"
          placeholder="Email Address..."
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={dataStoreRef} 
            className="accent-secondary" 
            type="checkbox" 
            id="storeData" 
            checked={saveData} 
            onChange={(e) => handleCheckChange(e)} 
            name="storeData" 
          />
          <label className="ml-2 text-xs text-gray-500 cursor-pointer" htmlFor="storeData">Save email and name for my next comment</label>
        </div>
      </div>
      {error ? <p className="text-xs text-red-500">{error}</p> : ""}
      <div className="mt-8">
        <button className="transition duration-100 ease-in hover:bg-secondary inline-block bg-primary hover:translate-y-1 hover:scale-105 text-md rounded-full text-white px-8 py-3 cursor-pointer" type="submit">
          {showLoading ? "Please Wait..." : "Post Comment"}
        </button>
        {showSuccessMessage ? <p className="text-xs float-right font-semibold mt-3 text-green-500">Comment submitted for review!</p> : ""}
      </div>
    </form>
  )
}

export default CommentsForm
