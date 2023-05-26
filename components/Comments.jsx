import { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser"
import { getComments } from "@/services";
import { comment } from "postcss";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug)
      .then(res => setComments(res))
  }, [])

  const commentElements = comments.map((comment) => {
    return (
      <div key={comment.createdAt} className="border-b border-gray-100 mb-4 pb-4">
        <p className="mb-4">
          <span className="font-semibold">{`${comment.name} - ${moment(comment.createdAt).format("MMM DD, YYYY HH:MM a")}`}</span>
        </p>
        <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.comment)}</p>
      </div>
    )
  })

  return (
    <>
      {comments.length ?
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {`${comments.length} ${comments.length > 1 ? "comments" : "comment"}`}
          </h3>
          {commentElements}
        </div>
        : 
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {`${comments.length} comments`}
          </h3>
          <p className="text-md font-base">Be the first to leave a comment!</p>
        </div>
      }
    </>
  )
}

export default Comments
